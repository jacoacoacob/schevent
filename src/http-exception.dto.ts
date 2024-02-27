import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpExceptionDto {
  @ApiProperty()
  statusCode: HttpStatus;

  @ApiProperty()
  message: string;
}
