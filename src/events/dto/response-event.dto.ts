import { ApiProperty } from '@nestjs/swagger';
import { Types, Date } from 'mongoose';

export class EventResponseDto {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  startsAt: Date;

  @ApiProperty()
  invitees: string[];
}
