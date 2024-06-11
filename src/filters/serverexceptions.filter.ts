import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { logger } from '../logger/winston.logger';

@Catch()
export class ServerExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const httpHost = host.switchToHttp();
    const response = httpHost.getResponse<Response>();
    const request = httpHost.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    // Only handle 5XX errors
    if (status >= 500 && status < 600) {
      const errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message || 'Internal server error',
      };

      // Log the exception using Winston
      logger.error(`HTTP ${status} ${request.method} ${request.url}`, {
        exception: {
          message: exception.message,
          stack: exception.stack,
        },
        request: {
          headers: request.headers,
          body: request.body,
          params: request.params,
          query: request.query,
        },
        response: errorResponse,
      });

      response.status(status).json(errorResponse);
    } else {
      // Pass non-5XX errors to the default exception handler
      response.status(status).json({
        statusCode: status,
        message: exception.message,
      });
    }
  }
}
