import { Dependencies, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pagamento } from '../../domain/entities/pagamento.entity';


/**
 * @class PagamentoRepositoryORM
 * @description Repositório de Pagamento
 */
@Injectable()
@Dependencies(getRepositoryToken(Pagamento))
export class PagamentoRepositoryORM {
  constructor(pagamentos) {
    this.pagamentos = pagamentos;
  }

  /**
   * @method registrarPagamento
   * @description
   * @param {Pagamento} pagamento
   */
  async registrarPagamento(pagamento) {
    return await this.pagamentos.save(pagamento);
  }
}
