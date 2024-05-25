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
  async getTodasAssinaturas() {
    return this.assinaturasRepository.find();
  }

  /**
   * @method criarAssinatura
   * @description Cria uma nova assinatura
   * @returns {Promise<Assinatura>}
   * @param {Assinatura} assinatura
   */
  async criarAssinatura(assinatura) {
    return await this.assinaturasRepository.save(assinatura);
  }

  /**
   * @method getAssinaturaPorTipo
   * @param tipo
   * @returns {Promise<Assinatura[]>}
   * @description Retorna todas as assinaturas por tipo
   */
  async getAssinaturaPorTipo(tipo) {
    return this.assinaturasRepository.find({
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
  async getAssinaturaByCodigoCliente(codigoCliente) {
    return this.assinaturasRepository.find({ where: { cliente: { codigo: codigoCliente } } });
  }

  /**
   * @method getAssinaturaByCodigoAplicativo
   * @param codigoAplicativo
   * @returns {Promise<Assinatura[]>}
   */
  async getAssinaturaByCodigoAplicativo(codigoAplicativo) {
    return this.assinaturasRepository.find({ where: { aplicativo: { codigo: codigoAplicativo } } });
  }

  /**
   * @method getAssinaturaByCodigoAssinatura
   * @param codigo
   * @returns {Promise<Assinatura>}
   */
  async getAssinaturaByCodigoAssinatura(codigo) {
    return this.assinaturasRepository.findOneById(codigo);
  }

  /**
   * @method atualizarAssinatura
   * @description Atualiza uma assinatura
   * @param {Assinatura} assinatura
   */
  async atualizarAssinatura(assinatura) {
    let ok = await this.assinaturasRepository.createQueryBuilder().update(Assinatura).set({ ...assinatura }).where('codigo = :codigo', { codigo: assinatura.codigo }).execute();
    if (ok.affected === 0) {
      throw new Error('Assinatura não encontrada');
    }
    return await this.getAssinaturaByCodigoAssinatura(assinatura.codigo);
  }
}


