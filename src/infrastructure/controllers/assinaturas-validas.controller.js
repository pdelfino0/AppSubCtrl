import { Bind, Controller, Dependencies, Get, Param } from '@nestjs/common';
import { AssinaturasValidasService } from '../services/assinaturas-validas.service';

@Controller('assinvalidas')
@Dependencies(AssinaturasValidasService)
export class AssinaturasValidasController {

  constructor(assinaturaValidasService) {
    this.assinaturaValidasService = assinaturaValidasService;
  }

  /**
   * @method verificaAssinaturaValida
   * @param param
   * @returns {Promise<{message: string}|{message: string}|{message: string}>|*}
   */
  //Endpoint para verificar se uma assinatura é válida
  @Get(':codass')
  @Bind(Param())
  verificaAssinaturaValida(param) {
    const codAssinatura = Number(param.codass);
    return this.assinaturaValidasService.verificaAssinaturaValida(codAssinatura);
  }
}

module.exports = { AssinaturasValidasController };