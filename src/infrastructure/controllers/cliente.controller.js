import { Controller, Dependencies, Get } from '@nestjs/common';
import { ClienteService } from '../services/cliente.service';

/**
 * @class ClienteController
 * @description Controller de Cliente
 */
@Controller('servcad/clientes')
@Dependencies(ClienteService)
export class ClienteController {
  constructor(clienteService) {
    this.clienteService = clienteService;
  }

  /**

   * @method getTodosClientes
   * @returns {Promise<ClienteResponseDto[]>}
   */
  //Endpoint para retornar todos os clientes
  @Get()
  getTodosClientes() {
    return this.clienteService.getTodosClientes();
  }
}

module.exports = { ClienteController };