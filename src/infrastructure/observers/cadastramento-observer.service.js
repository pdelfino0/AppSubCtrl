import { Dependencies, Injectable } from '@nestjs/common';
import { AssinaturaService } from '../services/assinatura.service';
import { IObserver } from './i-observer';


@Injectable()
@Dependencies(AssinaturaService)
export class CadastramentoObserver extends IObserver {
  constructor(AssinaturaService) {
    super();
    this.AssinaturaService = AssinaturaService;
  }

  /**
   * @method notify
   * @description Notifica o serviço de assinatura sobre um evento de pagamento realizado
   * @param {PagamentoEfetuadoEvento} pagamentoEfetuadoEvento
   */
  // Notifica o serviço de assinatura sobre um evento de pagamento realizado para que ele possa atualizar a assinatura
  notify(pagamentoEfetuadoEvento) {
    this.AssinaturaService.pagamentoRealizado(pagamentoEfetuadoEvento);
  }
}