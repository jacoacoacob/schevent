import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationsService } from './notifications/notifications.service';

const DATABASE_URL = 'mongodb://localhost/schevent';

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_URL),
    ScheduleModule.forRoot(),
    EventsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotificationsService],
})
export class AppModule {}
