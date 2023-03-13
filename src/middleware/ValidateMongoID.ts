import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateMongoID implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.params.id) {
      if (!/^[a-fA-F0-9]{24}$/.test(req.params.id)) {
        throw new BadRequestException('invalid mongoose ID');
      }
    }
    next();
  }
}
