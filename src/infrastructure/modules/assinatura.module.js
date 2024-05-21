import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assinatura } from '../../domain/entities/assinatura.entity';
import { AssinaturaController } from '../controllers/assinatura.controller';
import { AssinaturaRepositoryORM } from '../repositories/assinatura-orm.repository';
import { AssinaturaService } from '../services/assinatura.service';

/**
 * @class AssinaturaModule
 * @description Módulo responsável por prover a funcionalidade de assinatura.
 */

@Module
({
  imports: [TypeOrmModule.forFeature([Assinatura])],
  controllers: [AssinaturaController],
  providers: [AssinaturaRepositoryORM, AssinaturaService],
})

export class AssinaturaModule {
}