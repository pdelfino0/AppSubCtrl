import { Dependencies, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Assinatura } from '../../domain/entities/assinatura.entity';

/**
 * @class AssinaturaRepositoryORM
 * @description Repositório de Assinatura
 * @method todos Retorna todas as assinaturas
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

  async todasAssinaturas() {
    return this.assinaturasRepository.find();
  }
}