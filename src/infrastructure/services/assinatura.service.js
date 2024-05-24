import { Dependencies, Injectable } from '@nestjs/common';
import { AssinaturaRepositoryORM } from '../repositories/assinatura-orm.repository';
import { Assinatura } from '../../domain/entities/assinatura.entity';
import { formatDateToMySQL } from '../../common/utils';
import { AssinaturaResponseDto } from '../../common/dto/responses/assinatura-response-dto';

/**
 * @class AssinaturaService
 * @description Serviço de Assinatura
 * @method todasAssinaturas - Retorna todas as assinaturas
 */
@Injectable()
@Dependencies(AssinaturaRepositoryORM)
export class AssinaturaService {

  #PERIODO_GRATUITO = 7;
  #EXTENSAO_VIGENCIA = 30;

  constructor(assinaturaRepositoryORM) {
    this.assinaturaRepository = assinaturaRepositoryORM;
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
   * @returns {AssinaturaResponseDto} assinaturaResponseDto
   */
  async getTodasAssinaturas() {
    return this.convertListAssinaturaToResponseDto(await this.assinaturaRepository.getTodasAssinaturas());
  }

  /**
   * @method criarAssinatura
   * @description Cria uma nova assinatura
   * @param createAssinaturaDto
   * @returns {Promise<*|Assinatura>}
   */
  async criarAssinatura(createAssinaturaDto) {
    const inicioVigencia = new Date();
    const fimVigencia = new Date(inicioVigencia);
    fimVigencia.setDate(inicioVigencia.getDate() + this.#PERIODO_GRATUITO);

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
   * @param pagamentoRealizadoEvento
   */
  //TODO: Verificao se o valor pago é o mesmo que o valor da assinatura
  //TODO: Inserir no banco o pagamento realizado
  async pagamentoRealizado(pagamentoRealizadoEvento) {

    const codigoAssinatura = pagamentoRealizadoEvento.codAss;
    return this.renovarAssinatura(codigoAssinatura);
  }

  /**
   * @method renovarAssinatura
   * @description Renova a assinatura por mais {this.EXTENSAO_VIGENCIA} dias
   * @param codigoAssinatura
   */
  async renovarAssinatura(codigoAssinatura) {
    const assinatura = await this.assinaturaRepository.getAssinaturaByCodigo(codigoAssinatura);
    const fimVigencia = new Date(assinatura.fimVigencia);
    const fimVigenciaAtualizada = new Date(fimVigencia);
    fimVigenciaAtualizada.setDate(fimVigencia.getDate() + this.#EXTENSAO_VIGENCIA);
    const novaAssinatura = {
      codigo: assinatura.codigo,
      inicioVigencia: assinatura.fimVigencia,
      fimVigencia: formatDateToMySQL(fimVigenciaAtualizada),
      codigoAplicativo: assinatura.codigoAplicativo,
      codigoCliente: assinatura.codigoCliente,
    };
    return await this.assinaturaRepository.atualizarAssinatura(novaAssinatura);
  }
}
module.exports = { AssinaturaService };
