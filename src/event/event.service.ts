import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { EventGame } from './event.entity';
import { User } from '../user/user.entity';
import { Game } from '../game/game.entity';
import { CreateEventDto, UpdateEventDto } from './event.interface';
import { Spot } from '../spot/spot.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventGame) private eventRepository: Repository<EventGame>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    @InjectRepository(Spot) private spotRepositiory: Repository<Spot>,
  ) { }

  async createEvent(dto: CreateEventDto): Promise<EventGame> {
    const organizer = await this.userRepository.findOneBy({ id: dto.organizerId });

    if (!organizer) {
      throw new NotFoundException(`User with ID ${dto.organizerId} not found`);
    }
    const spot = await this.spotRepositiory.findOneBy({ id: dto.spotId });

    if (!spot) {
      throw new NotFoundException(`Spot with ID ${dto.spotId} not found`);
    }

    const participants = await this.userRepository.findByIds(dto.participantsIds);

    if (participants.length !== dto.participantsIds.length) {
      throw new NotFoundException(`Participants with ID ${dto.participantsIds.map(el=>el)} not found`);
    }

    debugger;
    const eventGame = new EventGame();
    eventGame.date = dto.date;
    eventGame.description = dto.description;
    eventGame.title = dto.title;
    eventGame.organizer = organizer;
    eventGame.spot = spot;
    eventGame.isPrivate = dto.isPrivate;
    eventGame.maxParticipants = dto.maxParticipants;
    eventGame.participants = participants;
    
    if (dto.gameIds && dto.gameIds.length) {
      eventGame.games = await this.gameRepository.findByIds(dto.gameIds);
    }

    const event = this.eventRepository.create(eventGame);
    return this.eventRepository.save(event);
  }

  async getAllEvents(): Promise<EventGame[]> {
    return this.eventRepository.find();
  }

  async getEventById(id: number): Promise<EventGame> {
    const event = await this.eventRepository.findOne({ where: { id }, relations: ['organizer', 'participants','spot','games'] });
    if (!event) throw new NotFoundException(`Event with ID ${id} not found`);
    return event;
  }

  async updateEvent(id: number, dto: UpdateEventDto): Promise<EventGame> {
    const event = await this.getEventById(id);

    // if (dto.gameIds) {
    //   const game = await this.gameRepository.findOne({ where: { id: dto.gameIds } });
    //   if (!game) throw new NotFoundException('Game not found');
    //   event.games = game;
    // }

    if (dto.participantsIds) {
      const pariticipains = await this.userRepository.findByIds(dto.participantsIds);
      if (pariticipains.length !== dto.participantsIds.length) {
        throw new NotFoundException('One or more users not found');
      }
      event.participants = pariticipains;
    }

    if (dto.spotId) {
      const spot = await this.spotRepositiory.findOne({ where: { id: dto.spotId } });
      if (!spot) throw new NotFoundException('Spot not found');
      event.spot = spot;
    }

    Object.assign(event, dto);
    return this.eventRepository.save(event);
  }

  async deleteEvent(id: number): Promise<void> {
    const event = await this.getEventById(id);
    await this.eventRepository.remove(event);
  }

  async assignParticipants(eventId: number, userIds: number[]): Promise<EventGame> {
    debugger;
    const event = await this.eventRepository.findOne({ where: { id: eventId }, relations: ['participants'] });

    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    const users = await this.userRepository.findByIds(userIds);

    if (users.length !== userIds.length) {
      throw new NotFoundException('One or more users not found');
    }

    event.participants = users;
    return this.eventRepository.save(event);
  }
}
