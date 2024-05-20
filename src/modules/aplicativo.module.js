import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from '../infrastructure/controller/cliente.controller';
import { ClienteRepositoryORM } from '../infrastructure/repositories/cliente-orm.repository';
import { Module } from '@nestjs/common';
import Aplicativo from '../domain/entities/aplicativo.entity';


@Module
({
  imports: [TypeOrmModule.forFeature([Aplicativo])],
  controllers: [ClienteController],
  providers: [ClienteRepositoryORM],
})