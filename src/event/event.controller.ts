import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, Query, ParseFloatPipe, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { EventGame } from './event.entity';
import { CreateEventDto, UpdateEventDto } from './event.interface';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  async createEvent(@Body() dto: CreateEventDto): Promise<EventGame> {
    return this.eventService.createEvent(dto);
  }

  @Get()
  async getAllEvents(): Promise<EventGame[]> {
    return this.eventService.getAllEvents();
  }

  @Get('/byUserFriends/:id')
  async getEventsByUserFriends(@Param('id', ParseIntPipe) id:number,@Query('days') days?: number): Promise<EventGame[]> {
    return this.eventService.getEventsByUserFriends(id,days);
  }

  @Get('/new')
  async getAllNewEvents(@Query('distance', new ParseFloatPipe({ optional: true })) distance?: number,
    @Query('userLat') userLat?: string,
    @Query('userLng') userLng?: string): Promise<EventGame[]> {
    return this.eventService.getAllNewEvents(distance,userLat,userLng);
  }

  @Get(':id')
  async getEventById(@Param('id', ParseIntPipe) id: number): Promise<EventGame> {
    return this.eventService.getEventById(id);
  }

  @Put(':id')
  async updateEvent(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEventDto): Promise<EventGame> {
    return this.eventService.updateEvent(id, dto);
  }

  @Delete(':id')
  async deleteEvent(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.eventService.deleteEvent(id);
  }

  @Post(':id/assign-players')
  async assignPlayers(@Param('id') eventId: number, @Body('userIds') userIds: number[]): Promise<EventGame> {
    return this.eventService.assignPlayers(eventId, userIds);
  }
}
