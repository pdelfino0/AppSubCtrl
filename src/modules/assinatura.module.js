import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assinatura } from '../domain/entities/assinatura.entity';
import { AssinaturaController } from '../infrastructure/controllers/assinatura.controller';
import { AssinaturaRepositoryORM } from '../infrastructure/repositories/assinatura-orm.repository';
import { AssinaturaService } from '../infrastructure/services/assinatura.service';
import { AplicativoModule } from './aplicativo.module';

/**
 * @class AssinaturaModule
 * @description Módulo responsável por prover a funcionalidade de assinatura.
 */

@Module
({
  // Importa o módulo de TypeORM para fornecer a funcionalidade de persistência para a entidade Assinatura
  imports: [TypeOrmModule.forFeature([Assinatura]), AplicativoModule],
  // Define os controladores e serviços que fazem parte do módulo
  controllers: [AssinaturaController],
  // Define os repositórios e serviços que fazem parte do módulo
  providers: [AssinaturaRepositoryORM, AssinaturaService],
})

export class AssinaturaModule {
}