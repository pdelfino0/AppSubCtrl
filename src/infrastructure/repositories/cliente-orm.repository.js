import { Dependencies, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cliente } from '../../domain/entities/cliente.entity';

@Injectable()
@Dependencies(getRepositoryToken(Cliente))
export class ClienteRepositoryORM {
  #clienteRepo;

  constructor(clientes) {
    this.#clienteRepo = clientes;
  }


  async todos() {
    return this.#clienteRepo.find();
  }
}

module.exports = { ClienteRepositoryORM };
