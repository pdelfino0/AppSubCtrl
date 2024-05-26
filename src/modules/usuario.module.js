/**
 * @class UsuarioModule
 * @classdesc Modulo de usuario
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../domain/entities/usuario.entity';
import { UsuarioRepositoryOrm } from '../infrastructure/repositories/usuario.repository';


@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [],
  providers: [UsuarioRepositoryOrm],
})
export class UsuarioModule {
}
