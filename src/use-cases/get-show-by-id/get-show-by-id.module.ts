import { Module } from '@nestjs/common';

import { SerieService } from '@/services/SerieService/SerieService';
import { ISerieService } from '@/services/SerieService/types';
import { GetShowByIdUseCase } from './get-show-by-id.use-case';
import { GetShowByIdController } from './get-show-by-id.controller';

@Module({
  controllers: [GetShowByIdController],
  providers: [
    {
      provide: GetShowByIdUseCase,
      useFactory: (serieService: ISerieService) => {
        return new GetShowByIdUseCase(serieService);
      },
      inject: [SerieService],
    },
    SerieService,
  ],
})
export class GetShowByIdModule {}
