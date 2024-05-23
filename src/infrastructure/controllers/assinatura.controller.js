import { Bind, Body, Controller, Dependencies, Get, Param, Post } from '@nestjs/common';
import { AssinaturaService } from '../services/assinatura.service';


/**
 * @class AplicativoController
 * @description Controller de Aplicativo
 * @method getTodos - Retorna todos os aplicativos
 */
@Controller('servcad/')
@Dependencies(AssinaturaService)
export class AssinaturaController {

  constructor(assinaturaService) {
    this.assinaturaService = assinaturaService;
  }

  /**
   * @method getTodasAssinaturas
   * @returns {Promise<Aplicativo[]>}
   */
  @Get('/assinaturas')
  getTodasAssinaturas() {
    return this.assinaturaService.todasAssinaturas();
  }

  /**
   * @method createAssinatura
   * @param {CreateAssinaturaDto} createAssinaturaDto
   * @returns {AssinaturaResponseDto} assinaturaResponseDto
   *
   */
  @Post('/assinaturas')
  @Bind(Body())
  createAssinatura(createAssinaturaDto) {
    return this.assinaturaService.criarAssinatura(createAssinaturaDto);
}


  /**
   * @method getAssinaturaByTipo
   * @param {Param} param
   * @returns {AssinaturaResponseDto} assinaturaResponseDto
   */
  @Get('assinaturas/:tipo')
  @Bind(Param())
  async getAssinaturaByTipo(param) {
    const { tipo } = param;
    return this.assinaturaService.getAssinaturaByTipo(tipo);
  }

  @Get('/asscli/:codcli')
  @Bind(Param())
  async getAssinaturaByCliente(param) {
    const { codcli } = param;
    console.log(codcli);
    return this.assinaturaService.getAssinaturaByCodigoCliente(codcli);
  }
}

module.exports = { AssinaturaController };
