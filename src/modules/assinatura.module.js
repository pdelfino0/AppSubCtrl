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
  imports: [TypeOrmModule.forFeature([Assinatura]), AplicativoModule],
  controllers: [AssinaturaController],
  providers: [AssinaturaRepositoryORM, AssinaturaService],
})

export class AssinaturaModule {
}