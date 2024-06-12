import { Dependencies, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Assinatura } from '../../domain/entities/assinatura.entity';
import { LessThan, MoreThan } from 'typeorm';

/**
 * @class AssinaturaRepositoryORM
 * @description Repositório de Assinatura
 */
@Injectable()
@Dependencies(getRepositoryToken(Assinatura))
export class AssinaturaRepositoryORM {

  constructor(assinaturasRepository) {
    this.assinaturasRepository = assinaturasRepository;
  }

  /**
   * @method getTodasAssinaturas Retorna todas as assinaturas
   * @description Retorna todas as assinaturas
   * @returns {Promise<Assinatura[]>}
   */
  // Retorna todas as assinaturas
  async getTodasAssinaturas() {
    return this.assinaturasRepository.find();
  }

  /**
   * @method criarAssinatura
   * @description Cria uma nova assinatura
   * @returns {Promise<Assinatura>}
   * @param {Assinatura} assinatura
   */
  // Cria uma nova assinatura
  async criarAssinatura(assinatura) {
    return await this.assinaturasRepository.save(assinatura);
  }

  /**
   * @method getAssinaturaPorTipo
   * @param tipo
   * @returns {Promise<Assinatura[]>}
   * @description Retorna todas as assinaturas por tipo
   */
  // Retorna todas as assinaturas por tipo (ativas, canceladas ou todas)
  async getAssinaturaPorTipo(tipo) {
    return this.assinaturasRepository.find({
      // Se o tipo for ATIVAS, retorna assinaturas com o fim da vigência maior que a data atual
      // Se o tipo for CANCELADAS, retorna assinaturas com o fim da vigência menor que a data atual
      // Caso seja passado o tipo TODAS, o Service retornará todas as assinaturas (outro método)
      where: {
        fimVigencia: tipo === 'ATIVAS' ? MoreThan(new Date()) : LessThan(new Date()),
      },
    });
  }

  /**
   * @method getAssinaturaByCodigoCliente
   * @param codigoCliente
   * @returns {Promise<Assinatura[]>}
   */
  // Retorna todas as assinaturas de um cliente pelo código dele
  async getAssinaturaByCodigoCliente(codigoCliente) {
    return this.assinaturasRepository.find({ where: { cliente: { codigo: codigoCliente } } });
  }

  /**
   * @method getAssinaturaByCodigoAplicativo
   * @param codigoAplicativo
   * @returns {Promise<Assinatura[]>}
   */
  // Retorna todas as assinaturas de um aplicativo pelo código dele
  async getAssinaturaByCodigoAplicativo(codigoAplicativo) {
    return this.assinaturasRepository.find({ where: { aplicativo: { codigo: codigoAplicativo } } });
  }

  /**
   * @method getAssinaturaByCodigoAssinatura
   * @param codigo
   * @returns {Promise<Assinatura>}
   */

  // Retorna uma assinatura pelo código dela
  async getAssinaturaByCodigoAssinatura(codigo) {
    return await this.assinaturasRepository.findOneById(codigo);
  }

  /**
   * @method atualizarAssinatura
   * @description Atualiza uma assinatura
   * @param {Assinatura} assinatura
   */
  // Atualiza uma assinatura passando o objeto assinatura
  async atualizarAssinatura(assinatura) {
    let ok = await this.assinaturasRepository.createQueryBuilder().update(Assinatura).set({ ...assinatura }).where('codigo = :codigo', { codigo: assinatura.codigo }).execute();
    //Se o número de registros afetados for 0, lança uma exceção
    if (ok.affected === 0) {
      throw new Error('Assinatura não encontrada');
    }
  }
}

module.exports = { AssinaturaRepositoryORM };