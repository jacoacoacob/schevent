import { ApiProperty } from '@nestjs/swagger';
// import { PartialType } from '@nestjs/mapped-types';
// import { CreateEventDto } from './create-event.dto';

// TODO: Get swagger to recogize `ApiField`s from parent Dto class
export class UpdateEventDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  timestamp?: string;

  @ApiProperty({ required: false })
  invitees?: string[];
}

// export class UpdateEventDto extends PartialType(CreateEventDto) {}
