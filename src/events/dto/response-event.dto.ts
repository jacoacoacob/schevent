import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class EventResponseDto {
  @ApiProperty()
  _id: Types.ObjectId['_id'];

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  invitees: string[];
}
