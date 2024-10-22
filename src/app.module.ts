import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerMiddleware } from './middlewares/LoggerMiddleware';
import { GetSeasonDetailsModule } from './use-cases/get-season-details/get-season-details.module';
import { GetShowByIdModule } from './use-cases/get-show-by-id/get-show-by-id.module';
import { HealthModule } from './use-cases/health/health.module';
import { ListEpisodesIdsModule } from './use-cases/list-episodes-ids/list-episodes-ids.module';
import { SearchSerieModule } from './use-cases/search-serie/search-serie.module';
import { CreateUserModule } from './use-cases/user/create-user/create-user.module';
import { ListUsersModule } from './use-cases/user/list-users/list-users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HealthModule,
    CreateUserModule,
    ListUsersModule,
    SearchSerieModule,
    GetShowByIdModule,
    GetSeasonDetailsModule,
    ListEpisodesIdsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Para aplicar a todas as rotas
  }
}
