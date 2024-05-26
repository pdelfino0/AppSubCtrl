import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './modules/cliente.module';
import { AplicativoModule } from './modules/aplicativo.module';
import { AssinaturaModule } from './modules/assinatura.module';
import { UsuarioModule } from './modules/usuario.module';
import * as fs from 'fs';
import * as path from 'path';

const configPath = path.resolve(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: config.database.type,
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      synchronize: true,
      autoLoadEntities: true,
    }),
    ClienteModule,
    AssinaturaModule,
    AplicativoModule,
    UsuarioModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {
}