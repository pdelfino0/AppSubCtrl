import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagamento } from '../domain/entities/pagamento.entity';
import { PagamentoRepositoryORM } from '../infrastructure/repositories/pagamento-orm.repository';
import { PagamentoService } from '../infrastructure/services/pagamento.service';
import { PagamentoController } from '../infrastructure/controllers/pagamento.controller';

@Module({
  //Importa o módulo de TypeORM para fornecer a funcionalidade de persistência para a entidade Pagamento
  imports: [TypeOrmModule.forFeature([Pagamento])],
  // Define os controladores e serviços que fazem parte do módulo
  controllers: [PagamentoController],
  // Define os repositórios e serviços que fazem parte do módulo
  providers: [PagamentoRepositoryORM, PagamentoService],

})
export class PagamentoModule {
}