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

  private PERIODO_GRATUITO = 7;
  private EXTENSAO_VIGENCIA = 30;

  constructor(assinaturaRepositoryORM) {
    this.assinaturaRepository = assinaturaRepositoryORM;
  }

  /**
   * @method todasAssinaturas
   * @description Retorna todas as assinaturas
   * @returns {AssinaturaResponseDto} assinaturaResponseDto
   */
  async todasAssinaturas() {
    return this.convertListAssinaturaToResponseDto(await this.assinaturaRepository.getTodasAssinaturas());
  }

  /**
   * @method criarAssinatura
   * @description Cria uma nova assinatura
   * @param createAssinaturaDto
   * @returns {Promise<*|Assinatura>}
   */
  //TODO: Refatorar para criar assinaturas com vigência de 7 dias padrão.
  async criarAssinatura(createAssinaturaDto) {
    const inicioVigencia = new Date();
    const fimVigencia = new Date(inicioVigencia);
    fimVigencia.setDate(inicioVigencia.getDate() + 30);

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

  //TODO: Criar um método para extender a vigência de uma assinatura de 7 dias para 30 dias mediante pagamento.


  /**
   *
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
   * @method getStatusAssinatura
   * @description Define se a assinatura é válida ou cancelada
   * @param {string} fimVigencia
   * @returns {string}
   */

  static getStatusAssinatura(fimVigencia) {
    return new Date(fimVigencia) < new Date() ? 'CANCELADA' : 'ATIVA';
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
}

module.exports = { AssinaturaService };
