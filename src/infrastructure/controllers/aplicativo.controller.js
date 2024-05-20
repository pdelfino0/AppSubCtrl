import { Controller, Dependencies, Get } from '@nestjs/common';
import { AplicativoService } from '../services/aplicativo.service';

/**
 * @class AplicativoController
 * @description Controller de Aplicativo
 * @method getTodos - Retorna todos os aplicativos
 */
@Controller('servcad/aplicativos')
@Dependencies(AplicativoService)
export class AplicativoController {

  constructor(AplicativoRepository) {
    this.aplicativoService = AplicativoRepository;
  }

  @Get()
  getTodos() {
    return this.aplicativoService.todos();
  }
}

module.exports = { AplicativoController };