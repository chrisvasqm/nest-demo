import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import {Request, Response} from 'express';
import {logger} from '../logger/winston.logger';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

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
  }
}
