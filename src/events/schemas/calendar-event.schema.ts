import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

type CalendarEventDocument = HydratedDocument<CalendarEvent>;

@Schema()
class CalendarEvent {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Date })
  startsAt: Date;

  @Prop({ type: [String], required: true })
  invitees: string[];

  /**
   * Indicates whether or not a notification has been sent for this event
   */
  @Prop({ required: false, default: false })
  _isNotificationSent: boolean;
}

const CalendarEventSchema = SchemaFactory.createForClass(CalendarEvent);

export { CalendarEvent, CalendarEventSchema };
export type { CalendarEventDocument };
