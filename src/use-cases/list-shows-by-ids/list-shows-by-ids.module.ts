import { Module } from '@nestjs/common';

import { ListShowsByIdsController } from './list-shows-by-ids.controller';

import { SerieService } from '@/services/SerieService/SerieService';
import { ISerieService } from '@/services/SerieService/types';
import { ListShowsByIdsUseCase } from './list-shows-by-ids.use-case';

@Module({
  controllers: [ListShowsByIdsController],
  providers: [
    {
      provide: ListShowsByIdsUseCase,
      useFactory: (serieService: ISerieService) => {
        return new ListShowsByIdsUseCase(serieService);
      },
      inject: [SerieService],
    },
    SerieService,
  ],
})
export class ListShowsByIdsModule {}
