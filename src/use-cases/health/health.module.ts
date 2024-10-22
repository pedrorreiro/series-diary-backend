import { Module } from '@nestjs/common';

import { HealthController } from './health.controller';
import { HealthUseCase } from './health.use-case';

@Module({
  controllers: [HealthController],
  providers: [
    {
      provide: HealthUseCase,
      useFactory: () => {
        return new HealthUseCase();
      },
    },
  ],
})
export class HealthModule {}
