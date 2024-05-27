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
   * @description Retorna todas as assinaturas
   * @returns {AssinaturaResponseDto[]} assinaturaResponseDto
   */
  //Endpoint para retornar todas as assinaturas
  @Get('/assinaturas')
  getTodasAssinaturas() {
    return this.assinaturaService.getTodasAssinaturas();
  }

  /**
   * @method createAssinatura
   * @description Cria uma nova assinatura
   * @param {CreateAssinaturaDto} createAssinaturaDto
   * @returns {AssinaturaResponseDto} assinaturaResponseDto
   */

  //Endpoint para criar uma nova assinatura
  @Post('/assinaturas')
  @Bind(Body())
  createAssinatura(createAssinaturaDto) {
    return this.assinaturaService.criarAssinatura(createAssinaturaDto);
  }


  //Endpoint para retornar todas as assinaturas a partir do status da assinatura (ativa, cancelada ou todas)
  /**
   * @method getAssinaturaByTipo
   * @description Retorna todas as assinaturas por tipo
   * @param {Param} param
   * @returns {AssinaturaResponseDto} assinaturaResponseDto
   */
  @Get('assinaturas/:tipo')
  @Bind(Param())
  async getAssinaturaByTipo(param) {
    const { tipo } = param;
    return this.assinaturaService.getAssinaturaByTipo(tipo);
  }

  /**
   * @method getAssinaturaByClienteCodigo
   * @description Retorna assinaturas de um cliente pelo código dele.
   * @param param
   * @returns {AssinaturaResponseDto} assinaturaResponseDto
   */

  //Endpoint para retornar todas as assinaturas de um cliente pelo código dele
  @Get('/asscli/:codcli')
  @Bind(Param())
  async getAssinaturaByClienteCodigo(param) {
    const { codcli } = param;
    return this.assinaturaService.getAssinaturaByCodigoCliente(codcli);
  }

  //Endpoint para retornar todas as assinaturas de um aplicativo pelo código dele
  /**
   * @method getAssinaturaByCodigoAplicativo
   * @param {Param} param
   * @returns {AssinaturaResponseDto} assinaturaResponse
   * @description
   */
  @Get('/assapp/:codapp')
  @Bind(Param())
  async getAssinaturaByCodigoAplicativo(param) {
    const { codapp } = param;
    return this.assinaturaService.getAssinaturaByCodigoAplicativo(codapp);
  }
}


module.exports = { AssinaturaController };
