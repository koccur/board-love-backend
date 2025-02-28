import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventGame } from './event.entity';
import { User } from '../user/user.entity';
import { Game } from '../game/game.entity';
import { CreateEventDto, UpdateEventDto } from './event.interface';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventGame) private eventRepository: Repository<EventGame>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Game) private gameRepository: Repository<Game>,
  ) {}

  async createEvent(createEventGameDto: CreateEventDto): Promise<EventGame> {
    debugger;
    // Check if the maker (user) exists
    const organizer = await this.userRepository.findOneBy({id:createEventGameDto.organizerId});

    if (!organizer) {
      throw new NotFoundException(`User with ID ${createEventGameDto.organizerId} not found`);
    }

    const event = this.eventRepository.create({...createEventGameDto,organizer:{id:createEventGameDto.organizerId}});
    debugger;
    return this.eventRepository.save(event);
  }

  async getAllEvents(): Promise<EventGame[]> {
    return this.eventRepository.find();
  }

  async getEventById(id: number): Promise<EventGame> {
    const event = await this.eventRepository.findOne({ where: { id }, relations:['organizer','participants'] });
    if (!event) throw new NotFoundException(`Event with ID ${id} not found`);
    return event;
  }

  async updateEvent(id: number, dto: UpdateEventDto): Promise<EventGame> {
    const event = await this.getEventById(id);

    if (dto.organizerId) {
      const organizer = await this.userRepository.findOne({ where: { id: dto.organizerId } });
      if (!organizer) throw new NotFoundException('Organizer not found');
      event.organizer = organizer;
    }

    if (dto.gameId) {
      const game = await this.gameRepository.findOne({ where: { id: dto.gameId } });
      if (!game) throw new NotFoundException('Game not found');
      event.game = game;
    }

    Object.assign(event, dto);
    return this.eventRepository.save(event);
  }

  async deleteEvent(id: number): Promise<void> {
    const event = await this.getEventById(id);
    await this.eventRepository.remove(event);
  }

    // Method to assign participants to an existing event
    async assignParticipants(eventId: number, userIds: number[]): Promise<EventGame> {
      debugger;
      const event = await this.eventRepository.findOne({ where: { id: eventId }, relations: ['participants'] });
  
      if (!event) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }
  
      // Fetch users by their IDs
      const users = await this.userRepository.findByIds(userIds);
  
      // Check if all users exist
      if (users.length !== userIds.length) {
        throw new NotFoundException('One or more users not found');
      }
  
      // Add participants to the event (avoiding duplicates)
      event.participants = users;
      return this.eventRepository.save(event);
    }
}
