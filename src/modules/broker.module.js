import { Module } from '@nestjs/common';
import { BrokerService } from '../infrastructure/services/broker.service';
import { CadastramentoObserver } from '../infrastructure/observers/cadastramento-observer.service';
import { AssinaturaModule } from './assinatura.module';

@Module({
  imports: [AssinaturaModule],
  controllers: [],
  providers: [BrokerService, CadastramentoObserver],
  exports: [BrokerService, CadastramentoObserver]
})

export class BrokerModule {
}