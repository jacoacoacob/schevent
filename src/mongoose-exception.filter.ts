import * as mongoose from 'mongoose';
import {
  HttpException,
  HttpStatus,
  ArgumentsHost,
  Catch,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

enum MongoServerErrorCode {
  DuplicateKey = 11000,
}

function handleMongooseError(error: mongoose.Error) {
  if (error instanceof mongoose.Error.ValidationError) {
    return new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
  if (error instanceof mongoose.Error.CastError) {
    return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  }
  return error;
}

function handleMongoServerError(error: mongoose.mongo.MongoServerError) {
  if (error.code === MongoServerErrorCode.DuplicateKey) {
    return new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
  return error;
}

@Catch(mongoose.mongo.MongoServerError, mongoose.Error)
class MongooseExceptionFilter extends BaseExceptionFilter {
  catch(
    exception: mongoose.mongo.MongoServerError | mongoose.Error,
    host: ArgumentsHost,
  ) {
    // TODO: audit for performance impact
    const logger = new Logger();
    logger.warn(exception.message);

    if (exception instanceof mongoose.Error) {
      return super.catch(handleMongooseError(exception), host);
    } else if (exception instanceof mongoose.mongo.MongoServerError) {
      return super.catch(handleMongoServerError(exception), host);
    }
    return super.catch(exception, host);
  }
}

export { MongooseExceptionFilter };
