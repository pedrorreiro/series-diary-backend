import { Module } from '@nestjs/common';

import { SearchSerieController } from './search-serie.controller';

import { SerieService } from '@/services/SerieService/SerieService';
import { ISerieService } from '@/services/SerieService/types';
import { SearchSerieUseCase } from './search-serie.use-case';

@Module({
  controllers: [SearchSerieController],
  providers: [
    {
      provide: SearchSerieUseCase,
      useFactory: (serieService: ISerieService) => {
        return new SearchSerieUseCase(serieService);
      },
      inject: [SerieService],
    },
    SerieService,
  ],
})
export class SearchSerieModule {}
