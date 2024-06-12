import { Dependencies, Injectable } from '@nestjs/common';
import { AssinaturaService } from '../services/assinatura.service';


@Injectable()
@Dependencies(AssinaturaService)
export class CadastramentoObserver {
  constructor(assinaturaService) {
    this.assinaturaService = assinaturaService;
  }

  /**
   * @method notify
   * @description Notifica o serviço de assinatura sobre um evento de pagamento realizado
   * @param {EventoPagamentoRealizado} eventoPagamentoRealizado
   */
  // Notifica o serviço de assinatura sobre um evento de pagamento realizado para que ele possa atualizar a assinatura
  // Aqui se implementa qualquer lógica de negócio que deve ser executada após um pagamento ser realizado
  async notify(eventoPagamentoRealizado) {
    let codigoAssinatura = eventoPagamentoRealizado.codAss;
    return await this.assinaturaService.renovarAssinatura(codigoAssinatura);
  }
}

module.exports = { CadastramentoObserver };