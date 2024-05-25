import { Dependencies, Injectable } from '@nestjs/common';
import { ClienteRepositoryORM } from '../repositories/cliente-orm.repository';
import { ClienteResponseDto } from '../../common/dto/responses/cliente-response-dto';


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

  /**
   * @method getTodosClientes
   * @description Retorna todos os clientes
   * @returns {Promise<ClienteResponseDto>}
   */
  async getTodosClientes() {
    return this.convertListClienteToResponseDto(await this.clienteRepo.getTodosClientes());
  }

  /**
   * @method convertClienteToClienteResponseDto
   * @description Converte um Cliente para ClienteResponseDto
   * @param {Cliente} cliente
   * @returns {ClienteResponseDto}
   */
  convertClienteToClienteResponseDto(cliente) {
    return new ClienteResponseDto(cliente);
  }

  /**
   * @method convertListClienteToResponseDto
   * @description Converte uma lista de Cliente para ClienteResponseDto
   * @param {Cliente[]} clientes
   * @returns {ClienteResponseDto[]}
   */
  convertListClienteToResponseDto(clientes) {
    return clientes.map(cliente => this.convertClienteToClienteResponseDto(cliente));
  }
}
module.exports = { ClienteService };