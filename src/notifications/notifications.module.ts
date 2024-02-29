import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CalendarEvent,
  CalendarEventSchema,
} from '../events/schemas/calendar-event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CalendarEvent.name, schema: CalendarEventSchema },
    ]),
  ],
  providers: [NotificationsService],
})
export class NotificationsModule {}
