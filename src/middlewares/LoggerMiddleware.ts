import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: any) {
    console.log('Incoming Request:', req.query);
    next();
  }
}
