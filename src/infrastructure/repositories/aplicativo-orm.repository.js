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
   * @method getTodosAplicativos
   * @returns {Promise<Aplicativo[]>}
   */
  // Retorna todos os aplicativos
  async getTodosAplicativos() {
    return this.aplicativos.find();
  }

  /**
   * @method findOne
   * @param id
   * @returns {Promise<Aplicativo>}
   */
  // Retorna um aplicativo pelo codigo
  async findOneById(id) {
    return this.aplicativos.findOne({ where: { codigo: id } });
  }

  /**
   * @method atualizar
   * @returns {Promise<Aplicativo>}
   * @param {Aplicativo} aplicativo
   */
  // Atualiza um aplicativo passando o objeto aplicativo
  async atualizar(aplicativo) {
    let ok = await this.aplicativos.createQueryBuilder().update(Aplicativo).set({ ...aplicativo }).where('codigo = :codigo', { codigo: aplicativo.codigo }).execute();
    if (ok.affected === 0) {
      throw new Error('Aplicativo não encontrado');
    }
    return await this.aplicativos.findOne({ where: { codigo: aplicativo.codigo } });
  }
}