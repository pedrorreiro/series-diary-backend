import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerMiddleware } from './middlewares/LoggerMiddleware';
import { SearchSerieModule } from './use-cases/search-serie/search-serie.module';

@Module({
  imports: [ConfigModule.forRoot(), SearchSerieModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Para aplicar a todas as rotas
  }
}
