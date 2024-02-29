import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CalendarEvent } from '../events/schemas/calendar-event.schema';

function minutesFromNow(minutes: number) {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}

@Injectable()
export class NotificationsService {
  private logger = new Logger(NotificationsService.name);

  constructor(
    @InjectModel(CalendarEvent.name)
    private calendarEventModel: Model<CalendarEvent>,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES, { name: 'trigger-notifications' })
  // // Use CronExpression.EVERY_MINUTE for debugging
  // @Cron(CronExpression.EVERY_MINUTE, { name: 'trigger-notifications' })
  async triggerNotifications() {
    this.logger.debug('[triggerNotifications]');

    const now = new Date();
    const halfHourFromNow = minutesFromNow(30);

    const shouldNotify = await this.calendarEventModel.find({
      startsAt: { $gte: now, $lte: halfHourFromNow },
      _isNotificationSent: false,
    });

    shouldNotify.forEach((event) => {
      this.queueNotifications(event);
      event._isNotificationSent = true;
      event.save();
    });
  }

  /**
   * This mocks a possible interface to queue up an event notification to
   * be handled flexibly elsewhere @see https://docs.nestjs.com/techniques/queues
   */
  queueNotifications(calednarEvent: CalendarEvent) {
    const { name: eventName, startsAt, invitees } = calednarEvent;

    // ...elsewhere, in a queue consumer
    invitees.forEach((invitee) => {
      // imagine this is sending a push notification or email or something...
      this.logger.log(
        `SENT NOTIFICATION: "Hey ${invitee}. Your event "${eventName}" is starting soon at ${startsAt}"`,
      );
    });
  }
}
