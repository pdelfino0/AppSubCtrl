import { Dependencies, Injectable } from '@nestjs/common';
import { CadastramentoObserver } from '../observers/cadastramento-observer.service';
import { AssinaturasValidasObserver } from '../observers/assinaturas-validas-observer.service';

/**
 * @class BrokerService
 * @description Serviço de Tópico
 * @method subscribe - Inscreve um observador
 * @method notifyAll - Notifica todos os observadores
 * @property observers
 */
@Dependencies(CadastramentoObserver, AssinaturasValidasObserver)
@Injectable()
export class BrokerService {
  observers = [];

  /**
   * @constructor
   * @param cadastramentoObserver
   * @param assinaturasValidasObserver
   */
  //Construtor já inscreve os observadores que foram injetados
  constructor(cadastramentoObserver, assinaturasValidasObserver) {
    this.cadastroObserver = cadastramentoObserver;
    this.assinaturasValidasObserver = assinaturasValidasObserver;
    this.subscribe(this.cadastroObserver);
    this.subscribe(this.assinaturasValidasObserver);
  }

  /**
   * @method notifyAll
   * @description Notifica todos os observadores
   * @param evento
   */
  //Notifica todos os observadores
  async notifyAll(evento) {
    await this.observers.forEach(observer => observer.notify(evento));
  }

  /**
   * @method subscribe
   * @description Inscreve um observador
   * @param observer
   */
  //Inscreve um observador
  subscribe(observer) {
    this.observers.push(observer);
  }
}

module.exports = { BrokerService };