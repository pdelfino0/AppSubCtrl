import { Dependencies, Injectable } from '@nestjs/common';
import { AssinaturasValidasService } from '../services/assinaturas-validas.service';


@Injectable()
@Dependencies(AssinaturasValidasService)
export class AssinaturasValidasObserver {
  constructor(assinaturasValidasService) {
    this.assinaturasValidasService = assinaturasValidasService;
  }

  /**
   * @method notify
   * @description Notifica o serviço de assinatura sobre um evento de pagamento realizado
   * @param {EventoPagamentoRealizado} eventoPagamentoRealizado
   */
  //TODO adicionar comentarios
  async notify(eventoPagamentoRealizado) {
    console.log('Evento EventoPagamentoRealizado recebido no Observer de Assinaturas Válidas');
    let codigoAssinatura = eventoPagamentoRealizado.codAss;
    this.assinaturasValidasService.adicionaAssinaturaValidaNoService(codigoAssinatura);
    console.log(`Tipo do codigo de assinatura passado para o assinatura valida service ${typeof codigoAssinatura}`);
    console.log(`Assinatura válida adicionada na cache de assinaturas válidas. Código da Assinatura: ${codigoAssinatura}`,
    );
  }
}

module.exports = { AssinaturasValidasObserver };
