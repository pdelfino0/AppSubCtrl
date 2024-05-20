import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * @function bootstrap
 * @description Inicializa o servidor
 * @returns {Promise<void>}
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
