import { Dependencies, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Assinatura } from '../../domain/entities/assinatura.entity';

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
   * @method todasAssinaturas Retorna todas as assinaturas
   * @returns {Promise<Assinatura[]>}
   */
  async todasAssinaturas() {
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
}