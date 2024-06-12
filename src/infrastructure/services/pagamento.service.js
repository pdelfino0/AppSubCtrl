import { Bind, Body, Dependencies, Injectable, Post } from '@nestjs/common';
import { Pagamento } from '../../domain/entities/pagamento.entity';
import { PagamentoRepositoryORM } from '../repositories/pagamento-orm.repository';
import { BrokerService } from './broker.service';
import { EventoPagamentoRealizado } from '../../common/events/evento-pagamento-realizado';
import { AssinaturaService } from './assinatura.service';
import { AplicativoService } from './aplicativo.service';

/**
 * @class PagamentoService
 * @description Service de Pagamento
 */

@Injectable() @Dependencies(PagamentoRepositoryORM, AssinaturaService, AplicativoService, BrokerService)
export class PagamentoService {
  constructor(pagamentoRepositoryORM, assinaturaService, aplicativoService, brokerService) {
    this.pagamentoRepo = pagamentoRepositoryORM;
    this.brokerService = brokerService;
    this.assinaturaService = assinaturaService;
    this.aplicativoService = aplicativoService;
  }

  /**
   * @method registrarPagamento
   * @param {CreatePagamentoDto} createPagamentoDto
   */

  // Registra um pagamento
  @Post() @Bind(Body())
  async registrarPagamento(createPagamentoDto) {
    //Extraindo variaveis do evento para facilitar a leitura
    const codigoAssinatura = createPagamentoDto.codAssinatura;
    const assinatura = await this.assinaturaService.getAssinaturaByCodigoAssinatura(codigoAssinatura);
    const codigoAplicativo = assinatura.aplicativo.codigo;
    const valorPago = createPagamentoDto.valorPago;

    //Verifica se o valor pago é igual ao valor da assinatura para evitar fraudes ou pagamento de valores errados
    if (!await this.aplicativoService.isValorPagoEqualCustoMensal(codigoAplicativo, valorPago)) {
      return this.MensagemValoresDivergentes(codigoAplicativo, valorPago);
    }

    let pagamento = new Pagamento(createPagamentoDto.codAssinatura, createPagamentoDto.valorPago, createPagamentoDto.dataPagamento);
    let evento = new EventoPagamentoRealizado(createPagamentoDto);
    try {
      await Promise.all([
        this.pagamentoRepo.registrarPagamento(pagamento),
        this.brokerService.notifyAll(evento),
      ]);
      return { message: 'Pagamento registrado com sucesso!' };
    } catch (e) {
      console.error(`Erro ao registrar pagamento: ${e.message}`);
      return { message: 'Erro ao registrar pagamento!' };
    }
  }


  /**
   * @method MensagemValoresDivergentes
   * @description Retorna uma mensagem de erro para valores divergentes
   * @param codigoAplicativo
   * @param valorPago
   * @returns {{message: string}}
   * @constructor
   */
  MensagemValoresDivergentes(codigoAplicativo, valorPago) {
    //Retorna uma mensagem de erro para valores divergentes e explica o motivo do cancelamento
    return {
      message: `O valor pago (${valorPago}) diverge do valor do custo mensal do aplicativo ${codigoAplicativo}. Sendo assim, estaremos cancelando essa operação por segurança. Por favor, tente novamente com o valor correto.`,
    };
  }
}

module.exports = { PagamentoService };