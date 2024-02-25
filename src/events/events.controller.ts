import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MongooseExceptionFilter } from '../mongoose-exception.filter';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
@UseFilters(MongooseExceptionFilter)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return await this.eventsService.create(createEventDto);
  }

  @Get()
  async findAll() {
    return await this.eventsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const event = await this.eventsService.findOne(id);
    if (!event) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return event;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const updatedEvent = await this.eventsService.update(id, updateEventDto);
    if (!updatedEvent) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return updatedEvent;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedEvent = await this.eventsService.remove(id);
    if (!deletedEvent) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return deletedEvent;
  }
}
