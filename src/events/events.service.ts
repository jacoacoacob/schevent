import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CalendarEvent } from './schemas/calendar-event.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(CalendarEvent.name)
    private calendarEventModel: Model<CalendarEvent>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const createdEvent = new this.calendarEventModel(createEventDto);
    return await createdEvent.save();
  }

  async findAll() {
    return await this.calendarEventModel.find().exec();
  }

  async findOne(id: string) {
    return await this.calendarEventModel.findById(id);
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    return await this.calendarEventModel.findByIdAndUpdate(id, updateEventDto);
  }

  remove(id: string) {
    return this.calendarEventModel.findByIdAndDelete(id);
  }
}
