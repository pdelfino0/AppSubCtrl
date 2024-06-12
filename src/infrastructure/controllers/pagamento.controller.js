import { Bind, Body, Controller, Dependencies, Param, Post } from '@nestjs/common';
import { PagamentoService } from '../services/pagamento.service';

/**
 * @class PagamentoController
 * @description Controller de Pagamento
 */

@Controller('registrarpagamento')
@Dependencies(PagamentoService)
export class PagamentoController {

  constructor(pagamentoService) {
    this.pagamentoService = pagamentoService;
  }

  /**
   * @method registrarPagamento
   * @param {CreatePagamentoDto} createPagamentoDto
   */

  //Endpoint para registrar um pagamento
  @Post()
  @Bind(Body(), Param())
  async registrarPagamento(createPagamentoDto) {
    return await this.pagamentoService.registrarPagamento(createPagamentoDto);
  }
}

module.exports = { PagamentoController };