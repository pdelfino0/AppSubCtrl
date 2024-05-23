import { Bind, Body, Controller, Dependencies, Get, Param, Post } from '@nestjs/common';
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

  /**
   * @method createAssinatura
   * @param createAssinaturaDto
   * @returns {Promise<Assinatura>|Promise<*>|*}
   */

  @Post()
  @Bind(Body())
  createAssinatura(createAssinaturaDto) {
    return this.assinaturaService.criarAssinatura(createAssinaturaDto);
}


  /**
   * @method getAssinaturaByTipo
   * @param {Param} param
   * @returns {AssinaturaResponseDto} assinaturaResponseDto
   */
  @Get('/:tipo')
  @Bind(Param())
  async getAssinaturaByTipo(param) {
    const { tipo } = param;
    return this.assinaturaService.getAssinaturaByTipo(tipo);
  }
}

module.exports = { AssinaturaController };
