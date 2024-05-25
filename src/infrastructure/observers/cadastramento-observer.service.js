import { Dependencies, Injectable } from '@nestjs/common';
import { AssinaturaService } from '../services/assinatura.service';
import type { IObserver } from './i-observer';


@Injectable()
@Dependencies(AssinaturaService)
export class CadastramentoObserver implements IObserver {
  constructor(AssinaturaService) {
    this.AssinaturaService = AssinaturaService;
  }

  /**
   * @method notify
   * @description Notifica o serviço de assinatura sobre um evento de pagamento realizado
   * @param {PagamentoEfetuadoEvento} pagamentoEfetuadoEvento
   */
  notify(pagamentoEfetuadoEvento) {
    this.AssinaturaService.pagamentoRealizado(pagamentoEfetuadoEvento);
  }
}