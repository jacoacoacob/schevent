import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';

const DATABASE_URL = 'mongodb://localhost/schevent';

@Module({
  imports: [MongooseModule.forRoot(DATABASE_URL), EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
