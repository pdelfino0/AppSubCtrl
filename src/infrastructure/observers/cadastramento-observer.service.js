import { Dependencies, Injectable } from '@nestjs/common';
import { AssinaturaService } from '../services/assinatura.service';
import type { IObserver } from './i-observer';


@Injectable()
@Dependencies(AssinaturaService)
export class CadastramentoObserverService implements IObserver {
  constructor(AssinaturaService) {
    this.AssinaturaService = AssinaturaService;
  }

  /**
   * @method notify
   * @description Notifica o serviço de assinatura sobre um evento de pagamento realizado
   * @param AssinaturaRenovadaEvento
   */
  notify(AssinaturaRenovadaEvento) {
    this.AssinaturaService.pagamentoRealizado(AssinaturaRenovadaEvento);
  }
}