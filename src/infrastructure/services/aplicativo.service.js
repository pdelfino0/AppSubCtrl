import { Dependencies, Injectable } from '@nestjs/common';
import { AplicativoRepositoryORM } from '../repositories/aplicativo-orm.repository';

/**
 * @class AplicativoService
 * @description Serviço de Aplicativo
 * @method todos - Retorna todos os aplicativos
 */
@Injectable()
@Dependencies(AplicativoRepositoryORM)
export class AplicativoService {
  constructor(aplicativoRepositoryORM) {
    this.aplicativoRepo = aplicativoRepositoryORM;
  }

  async todos() {
    return this.aplicativoRepo.todos();
  }
}