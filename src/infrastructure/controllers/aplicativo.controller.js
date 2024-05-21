import { Controller, Dependencies, Get } from '@nestjs/common';
import { AplicativoService } from '../services/aplicativo.service';


/**
 * @class AplicativoController
 * @description Controller de Aplicativo
 * @method getTodosAplicativos - Retorna todos os aplicativos
 */
@Controller('servcad/aplicativos')
@Dependencies(AplicativoService)
export class AplicativoController {

  constructor(aplicativoService) {
    this.aplicativoService = aplicativoService;
  }

 /**
  * @method getTodosAplicativos
  * @returns {Promise<Aplicativo[]>}
  */
  @Get()
 getTodosAplicativos() {
    return this.aplicativoService.todos();
  }
}

module.exports = { AplicativoController };