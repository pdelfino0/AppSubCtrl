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
    this.aplicativos = aplicativos;
  }

  /**
   * @method todos
   * @returns {Promise<Aplicativo[]>}
   */
  async todos() {
    return this.aplicativos.find();
  }

  /**
   *
   * @param custoMensal
   * @param codigoAplicativo
   * @returns {Promise<Aplicativo>}
   */

  async atualizar(custoMensal, codigoAplicativo) {
    let ok = await this.aplicativos.createQueryBuilder().update(Aplicativo).set({ custoMensal: custoMensal }).where('codigo = :codigo', { codigo: codigoAplicativo }).execute();
    if (ok.affected === 0) {
      throw new Error('Aplicativo não encontrado');
    }
    return await this.aplicativos.findOne({ where: { codigo: codigoAplicativo } });
  }
}