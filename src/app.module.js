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
  //Import o módulo do TypeORM para configurar a conexão com o banco de dados
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
    // Importa os módulos de Cliente, Assinatura, Aplicativo e Usuario
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