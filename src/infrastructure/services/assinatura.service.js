import { Dependencies, Injectable } from '@nestjs/common';
import { AssinaturaRepositoryORM } from '../repositories/assinatura-orm.repository';

/**
 * @class AssinaturaService
 * @description Serviço de Assinatura
 * @method todasAssinaturas - Retorna todas as assinaturas
 */
@Injectable()
@Dependencies(AssinaturaRepositoryORM)
export class AssinaturaService {
  constructor(assinaturaRepositoryORM) {
    this.assinaturaRepositoryORM = assinaturaRepositoryORM;
  }

  async todasAssinaturas() {
    return this.assinaturaRepositoryORM.todasAssinaturas();
  }
}

module.exports = { AssinaturaService };



