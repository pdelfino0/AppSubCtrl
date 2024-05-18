import { Injectable } from '@nestjs/common';

/**
 * Classe responsável por gerenciar as regras de negócio do aplicativo
 * @class AplicativoService
 */


@Injectable()
export class AplicativoService {

  constructor(aplicativoRepository) {
    this.aplicativoRepository = aplicativoRepository;
  }

  /**
   * Método responsável por retornar a lista de aplicativos
   * @returns {Promise<Aplicativo[]>}
   */

  async getAplicativos() {
    return this.aplicativoRepository.getAplicativos();
  }


