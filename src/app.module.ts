import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerMiddleware } from './middlewares/LoggerMiddleware';
import { SearchSerieModule } from './use-cases/search-serie/search-serie.module';
import { CreateUserModule } from './use-cases/user/create-user/create-user.module';
import { ListUsersModule } from './use-cases/user/list-users/list-users.module';
import { GetShowByIdModule } from './use-cases/get-show-by-id/get-show-by-id.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CreateUserModule,
    ListUsersModule,
    SearchSerieModule,
    GetShowByIdModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Para aplicar a todas as rotas
  }
}
