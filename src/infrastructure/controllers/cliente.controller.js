import { Controller, Dependencies, Get } from '@nestjs/common';
import { ClienteService } from '../services/cliente.service';

/**
 * @class ClienteController
 * @description Controller de Cliente
 * @method getTodos - Retorna todos os clientes
 */
@Controller('servcad/clientes')
@Dependencies(ClienteService)
class ClienteController {
  constructor(clienteService) {
    this.clienteService = clienteService;
  }


  @Get()
  getTodos() {
    return this.clienteService.todos();
  }
}

module.exports = { ClienteController };