import { Module } from '@nestjs/common';
import { BrokerService } from '../infrastructure/services/broker.service';
import { CadastramentoObserver } from '../infrastructure/observers/cadastramento-observer.service';
import { AssinaturaModule } from './assinatura.module';
import { AssinaturasValidasObserver } from '../infrastructure/observers/assinaturas-validas-observer.service';
import { AssinaturasValidasModule } from './validacao.assinaturas.module';

@Module({
  //Imports de Assinatura e Assinaturas Válidas
  imports: [AssinaturaModule, AssinaturasValidasModule],
  //Não possui controllers
  controllers: [],
  //Providers de Broker, Observadores
  providers: [BrokerService, CadastramentoObserver, AssinaturasValidasObserver],
  //Exporta o serviço de Broker e Observadores caso necessário.
  exports: [BrokerService, CadastramentoObserver],
})

export class BrokerModule {
}