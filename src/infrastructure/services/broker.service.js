import { Dependencies, Injectable } from '@nestjs/common';
import { CadastramentoObserver } from '../observers/cadastramento-observer.service';

/**
 * @class BrokerService
 * @description Serviço de Tópico
 * @method subscribe - Inscreve um observador
 * @method notifyAll - Notifica todos os observadores
 * @property observers
 */

@Dependencies(CadastramentoObserver)
@Injectable()
export class BrokerService {
  observers = [];

  constructor(cadastramentoObserver) {
    this.cadastroObserver = cadastramentoObserver;
    this.subscribe(this.cadastroObserver);

  }

  /**
   * @method notifyAll
   * @description Notifica todos os observadores
   * @param evento
   */
  async notifyAll(evento) {
    await this.observers.forEach(observer => observer.notify(evento));
  }

  subscribe(observer) {
    this.observers.push(observer);
  }
}

module.exports = { BrokerService };