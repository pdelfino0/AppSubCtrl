import { Dependencies, Injectable } from '@nestjs/common';
import { AssinaturaRepositoryORM } from '../repositories/assinatura-orm.repository';
import { Assinatura } from '../../domain/entities/assinatura.entity';
import { formatDateToMySQL } from '../../common/utils';
import { AssinaturaResponseDto } from '../dto/responses/assinatura-response-dto';

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

  async todasAssinaturas() {
    return this.assinaturaRepository.todasAssinaturas();
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
      return { message: 'Tipo inválido' };
    }
    if (tipo === 'TODAS') {
      console.log(tipo);
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
}
module.exports = { AssinaturaService };
