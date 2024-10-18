import { Module } from '@nestjs/common';

import { SerieService } from '@/services/SerieService/SerieService';
import { ISerieService } from '@/services/SerieService/types';
import { ListEpisodesIdsController } from './list-episodes-ids.controller';
import { ListEpisodesIdsUseCase } from './list-episodes-ids.use-case';

@Module({
  controllers: [ListEpisodesIdsController],
  providers: [
    {
      provide: ListEpisodesIdsUseCase,
      useFactory: (serieService: ISerieService) => {
        return new ListEpisodesIdsUseCase(serieService);
      },
      inject: [SerieService],
    },
    SerieService,
  ],
})
export class ListEpisodesIdsModule {}
