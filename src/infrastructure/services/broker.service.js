import { Injectable } from '@nestjs/common';

/**
 * @class BrokerService
 * @description Serviço de Tópico
 * @method subscribe - Inscreve um observador
 * @method notifyAll - Notifica todos os observadores
 * @property observers
 */
@Injectable()

export class BrokerService {
  #observers = [];


  constructor() {
  }

  /**
   * @method subscribe
   * @description Inscreve um observador
   * @param observer
   */
  subscribe(observer) {
    this.#observers.push(observer);
  }

  /**
   * @method notifyAll
   * @description Notifica todos os observadores
   * @param Evento
   */
  notifyAll(Evento) {
    this.#observers.forEach(observer => observer.notify(Evento));
  }
}