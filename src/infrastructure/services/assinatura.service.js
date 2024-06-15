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

  constructor(assinaturaRepositoryORM) {
    this.assinaturaRepository = assinaturaRepositoryORM;
  }

  /**
   * @method getStatusAssinatura
   * @description Define se a assinatura é válida ou cancelada
   * @param {string} fimVigencia
   * @returns {string}
   */
  // Define se a assinatura é válida ou cancelada (Centraliza a lógica de validação para evitar repetição de código)
  //Usado no DTO de resposta de assinatura
  static getStatusAssinatura(fimVigencia) {
    return new Date(fimVigencia) < new Date() ? 'CANCELADA' : 'ATIVA';
  }

  /**
   * @method getTodasAssinaturas
   * @description Retorna todas as assinaturas
   * @returns {AssinaturaResponseDto[]} assinaturaResponseDto
   */
  // Retorna todas as assinaturas
  async getTodasAssinaturas() {
    return this.convertListAssinaturaToResponseDto(await this.assinaturaRepository.getTodasAssinaturas());
  }

  /**
   * @method criarAssinatura
   * @description Cria uma nova assinatura
   * @param createAssinaturaDto
   * @returns {Promise<AssinaturaResponseDto>} assinaturaResponseDto
   */
  // Cria uma assinatura
  async criarAssinatura(createAssinaturaDto) {
    //Determina a data de início como a data atual
    const inicioVigencia = new Date();
    //Determina a data de fim como a data atual + o período gratuito
    const fimVigencia = new Date(inicioVigencia);
    fimVigencia.setDate(inicioVigencia.getDate() + Assinatura.PERIODO_GRATUITO);

    //Formata as datas para o formato do MySQL (localizado em common/utils/formatters.js)
    const formattedInicioVigencia = formatDateToMySQL(inicioVigencia);
    const formattedFimVigencia = formatDateToMySQL(fimVigencia);

    //Cria a assinatura
    const assinatura = new Assinatura(
      createAssinaturaDto.codigoAplicativo,
      createAssinaturaDto.codigoCliente,
      formattedInicioVigencia,
      formattedFimVigencia,
    );
    //Insere no banco e converte para DTO a resposta
    return this.convertAssinaturaToResponseDto(await this.assinaturaRepository.criarAssinatura(assinatura));
  }

  /**
   * @method getAssinaturaByTipo
   * @param tipo
   * @returns {AssinaturaResponseDto[]} assinaturas
   * @description Retorna todas as assinaturas por tipo
   */
  // Retorna todas as assinaturas por tipo
  async getAssinaturaByTipo(tipo) {
    //Define os tipos aceitos
    const tipos = ['ATIVAS', 'CANCELADAS', 'TODAS'];
    //Verifica se o tipo é válido
    if (!tipos.includes(tipo)) {
      return {
        message: 'Tipo inválido. Os valores aceitos são os seguintes: ' + tipos.join(', ') + '.',
      };
    }
    //Caso o tipo seja 'TODAS', retorna todas as assinaturas
    if (tipo === 'TODAS') {
      //Converte a lista de assinaturas para DTO de resposta
      return this.convertListAssinaturaToResponseDto(await this.assinaturaRepository.getTodasAssinaturas());

    }
    //Caso o tipo seja diferente de 'TODAS', retorna as assinaturas por tipo e novamente converte para DTO de resposta
    return this.convertListAssinaturaToResponseDto(await this.assinaturaRepository.getAssinaturaPorTipo(tipo));
  }

  /**
   * @method convertListAssinaturaToResponseDto
   * @param assinaturas
   * @returns {AssinaturaResponseDto[]} assinaturas
   */
  //Converte uma lista de assinaturas para DTO de resposta
  convertListAssinaturaToResponseDto(assinaturas) {
    return assinaturas.map((assinatura) => this.convertAssinaturaToResponseDto(assinatura));
  }

  /**
   * @method convertAssinaturaToResponseDto
   * @description Converte uma assinatura para DTO de resposta
   * @param assinatura
   * @returns {AssinaturaResponseDto}
   */
  //Converte uma assinatura para DTO de resposta
  convertAssinaturaToResponseDto(assinatura) {
    return new AssinaturaResponseDto(assinatura);
  }

  /**
   * @method getAssinaturaByCodigoCliente
   * @param codigoCliente
   * @returns {Promise<AssinaturaResponseDto[]>}
   * @description Retorna todas as assinaturas por código de cliente
   */
  // Retorna todas as assinaturas por código de cliente
  async getAssinaturaByCodigoCliente(codigoCliente) {
    //Converte a lista de assinaturas para DTO de resposta
    return this.convertListAssinaturaToResponseDto(await this.assinaturaRepository.getAssinaturaByCodigoCliente(codigoCliente));
  }

  /**
   *
   * @method getAssinaturaByCodigoAplicativo
   * @description Retorna todas as assinaturas por código de aplicativo
   * @param {number} codigoAplicativo
   * @returns {Promise<AssinaturaResponseDto[]>}
   */
  // Retorna todas as assinaturas por código de aplicativo
  async getAssinaturaByCodigoAplicativo(codigoAplicativo) {
    //Converte a lista de assinaturas para DTO de resposta
    return this.convertListAssinaturaToResponseDto(await this.assinaturaRepository.getAssinaturaByCodigoAplicativo(codigoAplicativo));
  }

  async getAssinaturaByCodigoAssinatura(codigoAssinatura) {
    return await this.assinaturaRepository.getAssinaturaByCodigoAssinatura(codigoAssinatura);
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
    await this.assinaturaRepository.atualizarAssinatura(assinatura).then(
      () => {
        console.log(`Assinatura ${codigoAssinatura} renovada com sucesso!`);
      },
      (e) => {
        console.error(`Erro ao renovar assinatura: ${e.message}`);
      },
    );
  }

  async verificarAssinaturaValidaNoService(codAssinatura) {
    let assinatura = await this.assinaturaRepository.getAssinaturaByCodigoAssinatura(codAssinatura);
    if (!assinatura) {
      throw new Error('Assinatura não encontrada');
    }
    if (assinatura.fimVigencia < new Date()) {
      console.log('Assinatura inválida');
      return false
    }
    console.log('Assinatura válida');
    return true;
  }
}

module.exports = { AssinaturaService };