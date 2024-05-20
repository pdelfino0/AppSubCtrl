import { TypeOrmModule } from '@nestjs/typeorm';


@Module
({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
  ],

  controllers: [
    ClienteController,
  ],

  providers: [
    ClienteRepositoryORM,

  ],
})