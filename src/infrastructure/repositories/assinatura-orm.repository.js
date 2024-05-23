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
   * @method todasAssinaturas
   * @returns {Promise<Assinatura[]>}
   */


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
   * @returns {Promise<Assinatura>}
   * @param assinatura
   */
  async criarAssinatura(assinatura) {
    return this.assinaturasRepository.save(assinatura);
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

}