import { Dependencies, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cliente } from '../../domain/entities/cliente.entity';

/**
 * @class ClienteRepositoryORM
 * @description Repositório de Cliente usando ORM
 * @method todos - Retorna todos os clientes
 */
@Injectable()
@Dependencies(getRepositoryToken(Cliente))
export class ClienteRepositoryORM {
  #clienteRepo;

  constructor(clientes) {
    this.#clienteRepo = clientes;
  }


  /**
   * @method getTodosClientes
   * @returns {Promise<Cliente[]>}
   */
  async getTodosClientes() {
    return this.#clienteRepo.find();
  }
}

module.exports = { ClienteRepositoryORM };
