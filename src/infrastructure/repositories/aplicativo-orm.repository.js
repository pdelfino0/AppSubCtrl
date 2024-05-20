import { Dependencies, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Aplicativo } from '../../domain/entities/aplicativo.entity';

/**
 * @class AplicativoRepositoryORM
 * @description Repositório de Aplicativo
 * @method todos Retorna todos os aplicativos
 */
@Injectable()
@Dependencies(getRepositoryToken(Aplicativo))

export class AplicativoRepositoryORM {

  constructor(aplicativos) {
    this.aplicativoRepo = aplicativos;
  }

  /**
   * @method todos
   * @returns {Promise<Aplicativo[]>}
   */
  async todos() {
    return this.aplicativoRepo.find();
  }
}