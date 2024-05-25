import { Dependencies, Injectable } from '@nestjs/common';
import { AssinaturaRepositoryORM } from '../repositories/assinatura-orm.repository';
import { Assinatura } from '../../domain/entities/assinatura.entity';
import { formatDateToMySQL } from '../../common/utils/formatters';
import { AssinaturaResponseDto } from '../../common/dto/responses/assinatura-response-dto';

/**
 * @class AssinaturaService
 * @description Serviço de Assinatura
 * @method todasAssinaturas - Retorna todas as assinaturas
 */
@Injectable()
@Dependencies(AssinaturaRepositoryORM)
export class AssinaturaService {

  constructor(assinaturaRepositoryORM, aplicativoService) {
    this.assinaturaRepository = assinaturaRepositoryORM;
    this.aplicativoService = aplicativoService;
  }

  /**
   * @method getStatusAssinatura
   * @description Define se a assinatura é válida ou cancelada
   * @param {string} fimVigencia
   * @returns {string}
   */
  static getStatusAssinatura(fimVigencia) {
    return new Date(fimVigencia) < new Date() ? 'CANCELADA' : 'ATIVA';
  }

  /**
   * @method getTodasAssinaturas
   * @description Retorna todas as assinaturas
   * @returns {AssinaturaResponseDto[]} assinaturaResponseDto
   */
  async getTodasAssinaturas() {
    return this.convertListAssinaturaToResponseDto(await this.assinaturaRepository.getTodasAssinaturas());
  }

  /**
   * @method criarAssinatura
   * @description Cria uma nova assinatura
   * @param createAssinaturaDto
   * @returns {Promise<AssinaturaResponseDto>} assinaturaResponseDto
   */
  async criarAssinatura(createAssinaturaDto) {
    const inicioVigencia = new Date();
    const fimVigencia = new Date(inicioVigencia);
    fimVigencia.setDate(inicioVigencia.getDate() + Assinatura.PERIODO_GRATUITO);

    const formattedInicioVigencia = formatDateToMySQL(inicioVigencia);
    const formattedFimVigencia = formatDateToMySQL(fimVigencia);

    const assinatura = new Assinatura(
      createAssinaturaDto.codigoAplicativo,
      createAssinaturaDto.codigoCliente,
      formattedInicioVigencia,
      formattedFimVigencia,
    );
    return this.convertAssinaturaToResponseDto(await this.assinaturaRepository.criarAssinatura(assinatura));
  }

  /**
   * @method getAssinaturaByTipo
   * @param tipo
   * @returns {AssinaturaResponseDto[]} assinaturas
   * @description Retorna todas as assinaturas por tipo
   */
  async getAssinaturaByTipo(tipo) {
    const tipos = ['ATIVAS', 'CANCELADAS', 'TODAS'];
    if (!tipos.includes(tipo)) {
      return {
        message: 'Tipo inválido. Os valores aceitos são os seguintes: ' + tipos.join(', ') + '.',
      };
    }
    if (tipo === 'TODAS') {
      return this.convertListAssinaturaToResponseDto(await this.assinaturaRepository.getTodasAssinaturas());

    }
    return this.convertListAssinaturaToResponseDto(await this.assinaturaRepository.getAssinaturaPorTipo(tipo));
  }

  /**
   * @method convertListAssinaturaToResponseDto
   * @param assinaturas
   * @returns {AssinaturaResponseDto[]} assinaturas
   */
  convertListAssinaturaToResponseDto(assinaturas) {
    return assinaturas.map((assinatura) => this.convertAssinaturaToResponseDto(assinatura));
  }

  /**
   * @method convertAssinaturaToResponseDto
   * @description Converte uma assinatura para DTO de resposta
   * @param assinatura
   * @returns {AssinaturaResponseDto}
   */
  convertAssinaturaToResponseDto(assinatura) {
    return new AssinaturaResponseDto(assinatura);
  }

  /**
   * @method getAssinaturaByCodigoCliente
   * @param codigoCliente
   * @returns {Promise<AssinaturaResponseDto[]>}
   * @description Retorna todas as assinaturas por código de cliente
   */
  async getAssinaturaByCodigoCliente(codigoCliente) {
    return this.convertListAssinaturaToResponseDto(await this.assinaturaRepository.getAssinaturaByCodigoCliente(codigoCliente));
  }

  /**
   *
   * @method getAssinaturaByCodigoAplicativo
   * @description Retorna todas as assinaturas por código de aplicativo
   * @param {number} codigoAplicativo
   * @returns {Promise<AssinaturaResponseDto[]>}
   */
  async getAssinaturaByCodigoAplicativo(codigoAplicativo) {
    return this.convertListAssinaturaToResponseDto(await this.assinaturaRepository.getAssinaturaByCodigoAplicativo(codigoAplicativo));
  }

  /**
   * @method pagamentoRealizado
   * @description Atualiza a assinatura com base no pagamento realizado
   * @param { PagamentoEfetuadoEvento } pagamentoEfetuadoEvento
   */
  async pagamentoRealizado(pagamentoEfetuadoEvento) {

    //Extraindo variaveis do evento para facilitar a leitura
    const codigoAssinatura = pagamentoEfetuadoEvento.codAss;
    const assinatura = await this.assinaturaRepository.getAssinaturaByCodigoAssinatura(codigoAssinatura);
    const codigoAplicativo = assinatura.aplicativo.codigo;
    const valorPago = pagamentoEfetuadoEvento.valorPago;

    //Verifica se o valor pago é igual ao valor da assinatura para evitar fraudes ou pagamento de valores errados
    if (!await this.aplicativoService.isValorPagoEqualCustoMensal(codigoAplicativo, valorPago)) {
      return this.MensagemValoresDivergentes(codigoAplicativo, valorPago);
    }

    //Caso verdade falso, renova a assinatura normalmente.
    return await this.renovarAssinatura(codigoAssinatura);
  }

  /**
   * @method MensagemValoresDivergentes
   * @description Retorna uma mensagem de erro para valores divergentes
   * @param codigoAplicativo
   * @param valorPago
   * @returns {{message: string}}
   * @constructor
   */
  MensagemValoresDivergentes(codigoAplicativo, valorPago) {
    //Retorna uma mensagem de erro para valores divergentes e explica o motivo do cancelamento
    return {
      message: `O valor pago (${valorPago}) diverge do valor do custo mensal do aplicativo ${codigoAplicativo}. Sendo assim, estaremos cancelando essa operação por segurança. Por favor, tente novamente com o valor correto.`,
    };
  }

  /**
   * @method renovarAssinatura
   * @description Renova a assinatura por mais {this.EXTENSAO_VIGENCIA} dias
   * @param codigoAssinatura
   */
  async renovarAssinatura(codigoAssinatura) {
    //Busca a assinatura no banco de dados
    const assinatura = await this.assinaturaRepository.getAssinaturaByCodigoAssinatura(codigoAssinatura);

    //Converte a data de fim de vigência para um objeto Date
    const fimVigenciaAtualizada = new Date(assinatura.fimVigencia);

    //Adiciona os dias de extensão da vigência (definido na classe Assinatura)
    fimVigenciaAtualizada.setDate(fimVigenciaAtualizada.getDate() + Assinatura.EXTENSAO_VIGENCIA);
    assinatura.fimVigencia = formatDateToMySQL(fimVigenciaAtualizada);

    //Atualiza a assinatura no banco de dados
    await this.assinaturaRepository.atualizarAssinatura(assinatura);
    //Logga no console que a assinatura foi renovada com sucesso
    console.log(`Assinatura ${codigoAssinatura} renovada com sucesso!`);


  }
}
module.exports = { AssinaturaService };
