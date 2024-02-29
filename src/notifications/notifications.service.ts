import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { CalendarEvent } from '../events/schemas/calendar-event.schema';

@Injectable()
export class NotificationsService {
  private logger = new Logger(NotificationsService.name);

  constructor(
    @InjectModel(CalendarEvent.name)
    private calendarEventModel: Model<CalendarEvent>,
  ) {}

  @Cron('0 */5 * * * *', { name: 'trigger-notifications' })
  triggerNotifications() {
    this.logger.debug('[triggerNotifications]');
  }
}
