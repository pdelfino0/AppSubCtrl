import { Controller, Dependencies, Get } from '@nestjs/common';
import { AssinaturaService } from '../services/assinatura.service';


/**
 * @class AplicativoController
 * @description Controller de Aplicativo
 * @method getTodos - Retorna todos os aplicativos
 */
@Controller('servcad/assinaturas')
@Dependencies(AssinaturaService)
export class AssinaturaController {

  constructor(assinaturaService) {
    this.assinaturaService = assinaturaService;
  }

  /**
   * @method getTodasAssinaturas
   * @returns {Promise<Aplicativo[]>}
   */
  @Get()
  getTodasAssinaturas() {
    return this.assinaturaService.todos();
  }
}

module.exports = { AssinaturaController };
