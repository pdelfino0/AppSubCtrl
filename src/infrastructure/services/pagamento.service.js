import { Bind, Body, Dependencies, Injectable, Post } from '@nestjs/common';
import { Pagamento } from '../../domain/entities/pagamento.entity';
import { PagamentoRepositoryORM } from '../repositories/pagamento-orm.repository';

/**
 * @class PagamentoService
 * @description Service de Pagamento
 */

@Injectable()
@Dependencies(PagamentoRepositoryORM)
export class PagamentoService {
  constructor(pagamentoRepositoryORM) {
    this.pagamentoRepo = pagamentoRepositoryORM;
  }

  /**
   * @method registrarPagamento
   * @param {CreatePagamentoDto} createPagamentoDto
   */

  // Registra um pagamento
  @Post()
  @Bind(Body())
  registrarPagamento(createPagamentoDto) {
    let pagamento = new Pagamento(createPagamentoDto.codAssinatura, createPagamentoDto.valorPago, createPagamentoDto.dataPagamento);
    try {
      this.pagamentoRepo.registrarPagamento(pagamento);
      return { message: 'Pagamento registrado com sucesso!' };
    } catch (e) {
      console.error(`Erro ao registrar pagamento: ${e.message}`);
      return { message: 'Erro ao registrar pagamento!' };
    }
  }
}

