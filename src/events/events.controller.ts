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
import { ApiResponse } from '@nestjs/swagger';
import { EventResponseDto } from './dto/response-event.dto';
import { HttpExceptionDto } from 'src/http-exception.dto';

@Controller('events')
@UseFilters(MongooseExceptionFilter)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiResponse({ status: 201, type: EventResponseDto })
  @ApiResponse({ status: 400, type: HttpExceptionDto })
  @ApiResponse({ status: 500, type: HttpExceptionDto })
  async create(
    @Body() createEventDto: CreateEventDto,
  ): Promise<EventResponseDto> {
    return await this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: EventResponseDto, isArray: true })
  @ApiResponse({ status: 500, type: HttpExceptionDto })
  async findAll(): Promise<EventResponseDto[]> {
    return await this.eventsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: EventResponseDto })
  @ApiResponse({ status: 400, type: HttpExceptionDto })
  @ApiResponse({ status: 404, type: HttpExceptionDto })
  async findOne(@Param('id') id: string): Promise<EventResponseDto> {
    const event = await this.eventsService.findOne(id);
    if (!event) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return event;
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: EventResponseDto })
  @ApiResponse({ status: 400, type: HttpExceptionDto })
  @ApiResponse({ status: 404, type: HttpExceptionDto })
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<EventResponseDto> {
    const updatedEvent = await this.eventsService.update(id, updateEventDto);
    if (!updatedEvent) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return updatedEvent;
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: EventResponseDto, description: 'Deleted' })
  @ApiResponse({ status: 400, type: HttpExceptionDto })
  @ApiResponse({ status: 404, type: HttpExceptionDto })
  async remove(@Param('id') id: string): Promise<EventResponseDto> {
    const deletedEvent = await this.eventsService.remove(id);
    if (!deletedEvent) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return deletedEvent;
  }
}
