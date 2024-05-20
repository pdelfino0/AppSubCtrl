import { Dependencies, Injectable } from '@nestjs/common';
import { ClienteRepositoryORM } from '../repositories/cliente-orm.repository';


/**
 * @class ClienteService
 * @description Serviço de Cliente
 * @method todos - Retorna todos os clientes
 */
@Injectable()
@Dependencies(ClienteRepositoryORM)

export class ClienteService {

  constructor(clienteRepositoryORM) {
    this.clienteRepo = clienteRepositoryORM;
  }

  async todos() {
    return this.clienteRepo.todos();
  }
}

module.exports = { ClienteService };