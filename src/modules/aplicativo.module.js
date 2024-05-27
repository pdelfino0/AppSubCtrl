import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AplicativoRepositoryORM } from '../infrastructure/repositories/aplicativo-orm.repository';
import { AplicativoService } from '../infrastructure/services/aplicativo.service';
import { AplicativoController } from '../infrastructure/controllers/aplicativo.controller';
import { Aplicativo } from '../domain/entities/aplicativo.entity';

/**
 * @class AplicativoModule
 * @description Módulo responsável por prover a funcionalidade de aplicativo.
 */
@Module
({
  // Importa o módulo de TypeORM para fornecer a funcionalidade de persistência para a entidade Aplicativo
  imports: [TypeOrmModule.forFeature([Aplicativo])],
  // Define os controladores e serviços que fazem parte do módulo
  controllers: [AplicativoController],
  // Define os repositórios e serviços que fazem parte do módulo
  providers: [AplicativoRepositoryORM, AplicativoService],
})

export class AplicativoModule {
}
