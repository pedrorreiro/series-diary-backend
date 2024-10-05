import { Module } from '@nestjs/common';

import { SerieService } from '@/services/SerieService/SerieService';
import { ISerieService } from '@/services/SerieService/types';
import { GetSeasonDetailsController } from './get-season-details.controller';
import { GetSeasonDetailsUseCase } from './get-season-details.use-case';

@Module({
  controllers: [GetSeasonDetailsController],
  providers: [
    {
      provide: GetSeasonDetailsUseCase,
      useFactory: (serieService: ISerieService) => {
        return new GetSeasonDetailsUseCase(serieService);
      },
      inject: [SerieService],
    },
    SerieService,
  ],
})
export class GetSeasonDetailsModule {}
