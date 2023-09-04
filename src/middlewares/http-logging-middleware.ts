import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { inspect } from 'util';


@Injectable()
class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const {
      ip, method, originalUrl: url, body,
    } = request;
    const userAgent = request.get('user-agent') || '';

    this.logger.log(`${method} - ${url} \n ${inspect(body, false, null, true)}`,);

    next();
  }
}

export default AppLoggerMiddleware;
