import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

type CalendarEventDocument = HydratedDocument<CalendarEvent>;

@Schema()
class CalendarEvent {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  timestamp: string;

  @Prop({ type: [String], required: true })
  invitees: string[];
}

const CalendarEventSchema = SchemaFactory.createForClass(CalendarEvent);

export { CalendarEvent, CalendarEventSchema };
export type { CalendarEventDocument };
