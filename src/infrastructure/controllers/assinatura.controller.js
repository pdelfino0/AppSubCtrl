import { Bind, Body, Controller, Dependencies, Get, Post } from '@nestjs/common';
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
    return this.assinaturaService.todasAssinaturas();
  }


  @Post()
  @Bind(Body())
  createAssinatura(createAssinaturaDto) {
    return this.assinaturaService.criarAssinatura(createAssinaturaDto);
}

}
module.exports = { AssinaturaController };
