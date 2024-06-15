import { Dependencies, Injectable } from '@nestjs/common';
import { AssinaturasValidasCache } from './assinaturas-validas-cache.service';
import { AssinaturaService } from './assinatura.service';

/**
 * @class AssinaturasValidasService
 * @description Serviço de Assinaturas Válidas
 */
//Serviço de Assinaturas Válidas
@Injectable()
@Dependencies(AssinaturasValidasCache, AssinaturaService)
export class AssinaturasValidasService {
  constructor(assinaturasValidasCache, assinaturaService) {
    this.assinaturasValidasCache = assinaturasValidasCache;
    this.assinaturaService = assinaturaService;
  }


  //Adiciona uma assinatura válida no serviço
  /**
   * @method adicionaAssinaturaValidaNoService
   * @description Adiciona uma assinatura válida no serviço
   * @param codAssinatura
   */
  adicionaAssinaturaValidaNoService(codAssinatura) {
    this.assinaturasValidasCache.adicionaAssinaturaValidaNaCache(codAssinatura);
  }

  /**
   * @method verificaAssinaturaValida
   * @description Verifica se uma assinatura é válida
   * @param codAssinatura
   * @returns {Promise<{valid: boolean, message: string}>}
   */
  //Verifica se uma assinatura é válida
  async verificaAssinaturaValida(codAssinatura) {
    //Verifica se a assinatura é válida na cache
    let isAssinaturaValida = await this.assinaturasValidasCache.verificaAssinaturaValidaNaCache(codAssinatura);
    //Se a assinatura for válida na cache, retorna que é valida e a mensagem de que foi retornada da cache
    if (isAssinaturaValida) {
      return {
        valid: true, message: 'Assinatura válida, retornada da cache',
      };
    }
    try {
      //Verifica se a assinatura é válida no serviço
      isAssinaturaValida = await this.assinaturaService.verificarAssinaturaValidaNoService(codAssinatura);
    } catch (error) {
      error.message;
    }
    //Se a assinatura for válida no serviço, adiciona ela na cache e retorna que é válida e a mensagem de que foi retornada do serviço
    if (isAssinaturaValida) {
      this.assinaturasValidasCache.adicionaAssinaturaValidaNaCache(codAssinatura);
      return {
        valid: true, message: 'Assinatura válida, retornada do serviço e adicionada à cache',
      };
    }
    //Se a assinatura não for válida, retorna que é inválida e a mensagem de que é inválida (early return)
    return {
      valid: false, message: 'Assinatura inválida',
    };
  }

}

module.exports = { AssinaturasValidasService };