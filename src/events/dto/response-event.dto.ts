import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class EventResponseDto {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  invitees: string[];
}
