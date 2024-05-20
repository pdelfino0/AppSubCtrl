import { Controller, Dependencies, Get } from '@nestjs/common';
import { ClienteRepositoryORM } from '../repositories/ClienteORM.repository';


@Controller('Clientes')
@Dependencies(ClienteRepositoryORM)
export class ClienteController {
  constructor(clienteRepositoryORM) {
    this.clienteRepo = clienteRepositoryORM;
  }


  @Get('todos')
  getTodos() {
    return this.clienteRepo.todos();
  }
}
