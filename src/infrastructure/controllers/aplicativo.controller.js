import { Bind, Body, Controller, Dependencies, Get, Param, Patch } from '@nestjs/common';
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
  * @returns {Promise<AplicativoResponseDto[]>} aplicativoResponseDto
  */
 //Endpoint para retornar todos os aplicativos
  @Get()
 getTodosAplicativos() {
   return this.aplicativoService.getTodosAplicativos();
  }

  /**
   * @method atualizarCustoMensalAplicativo
   * @param {updateCustoMensalAplicativoDto} updateCustoMensalAplicativoDto
   * @param {Param} param
   * @returns {AplicativoResponseDto}
   */
  //Endpoint para atualizar o custo mensal de um aplicativo
  @Patch('/:idAplicativo')
  @Bind(Body(), Param())
  atualizarCustoMensalAplicativo(
    updateCustoMensalAplicativoDto,
    param,
  ) {
    const { idAplicativo: codigoAplicativo } = param;
    return this.aplicativoService.atualizarCustoMensal(updateCustoMensalAplicativoDto, codigoAplicativo);
  }

}

module.exports = { AplicativoController };