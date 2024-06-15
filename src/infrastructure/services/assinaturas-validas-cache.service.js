import { Injectable } from '@nestjs/common';

@Injectable()
export class AssinaturasValidasCache {

  #assinaturasValidas = [];

  /**
   * @method verificaAssinaturaValidaNaCache
   * @description Verifica se uma assinatura é válida na cache
   * @param codAssinatura
   * @returns {Promise<boolean>}
   */
  //Verifica se uma assinatura é válida na cache
  async verificaAssinaturaValidaNaCache(codAssinatura) {
    return this.#assinaturasValidas.includes(codAssinatura);
  }

  //Adiciona uma assinatura válida na cache
  /**
   * @method adicionaAssinaturaValidaNaCache
   * @description Adiciona uma assinatura válida na cache
   * @param codAssinatura
   */
  adicionaAssinaturaValidaNaCache(codAssinatura) {
    this.#assinaturasValidas.push(codAssinatura);
  }

  constructor() {
  }
}

module.exports = { AssinaturasValidasCache };
