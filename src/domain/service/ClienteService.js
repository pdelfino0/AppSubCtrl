import { Injectable } from '@nestjs/common';

/**
 * Classe responsável por gerenciar as regras de negócio do cliente
 * @class ClienteService
 */
@Injectable()
export class ClienteService {
  constructor(clienteMySqlRepository) {
    this.clienteRepository = clienteMySqlRepository;
  }

  /**
   * Método responsável por retornar a lista de clientes
   * @returns {Promise<Cliente[]>}
   */
  async getClientes() {
    return this.clienteRepository.getClientes();
  }
}

