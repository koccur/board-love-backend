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

    const players = await this.userRepository.findByIds(dto.playersIds);

    if (players.length !== dto.playersIds.length) {
      throw new NotFoundException(`Players with ID ${dto.playersIds.map(el => el)} not found`);
    }

    const eventGame = new EventGame();
    eventGame.date = dto.date;
    eventGame.description = dto.description;
    eventGame.title = dto.title;
    eventGame.organizer = organizer;
    eventGame.spot = spot;
    eventGame.isPrivate = dto.isPrivate;
    eventGame.maxParticipants = dto.maxParticipants;
    eventGame.players = players;

    if (dto.gameIds && dto.gameIds.length) {
      eventGame.games = await this.gameRepository.findByIds(dto.gameIds);
    }

    const event = this.eventRepository.create(eventGame);
    return this.eventRepository.save(event);
  }

  async getAllEvents(): Promise<EventGame[]> {
    return this.eventRepository.find();
  }

  async getEventsByUserFriends(id: number,daysFromToday:number): Promise<EventGame[]>  {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['friends'],
    });

    if (!user) return [];

    const friendIds = user.friends.map(friend => friend.id);

    if (friendIds.length === 0) return []; 

    return this.eventRepository.find({
      where: {
        organizer: { id: In(friendIds) },
      },
      relations: ['organizer'],
    });
  }

  async getAllNewEvents(distance: number, userLat: string, userLng: string): Promise<EventGame[]> {
    if (!distance) {
      return this.eventRepository.find();
    }

    const events = this.eventRepository.find({ relations: ['spot'] });
    const fitleredEvents = [];
    (await events).forEach((event) => {
      const calcDistance = this.haversineDistance(event.spot.locationLat, event.spot.locationLng, userLat, userLng);
      if (calcDistance <= distance) {
        // @ts-ignore todo add DTO 
        event.distance = calcDistance;
        fitleredEvents.push(event);
      }
    })

    return fitleredEvents;
  }


  async getEventById(id: number): Promise<EventGame> {
    const event = await this.eventRepository.findOne({ where: { id }, relations: ['organizer', 'players', 'spot', 'games'] });
    if (!event) throw new NotFoundException(`Event with ID ${id} not found`);
    return event;
  }

  async updateEvent(id: number, dto: UpdateEventDto): Promise<EventGame> {
    const event = await this.getEventById(id);

    if (dto.gameIds) {
      const game = await this.gameRepository.findByIds(dto.gameIds);
      if (!game) throw new NotFoundException('One or more game not found');
      event.games = game;
    }

    if (dto.playersIds) {
      const pariticipains = await this.userRepository.findByIds(dto.playersIds);
      if (pariticipains.length !== dto.playersIds.length) {
        throw new NotFoundException('One or more users not found');
      }
      event.players = pariticipains;
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

  async assignPlayers(eventId: number, userIds: number[]): Promise<EventGame> {
    debugger;
    const event = await this.eventRepository.findOne({ where: { id: eventId }, relations: ['players'] });

    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    const users = await this.userRepository.findByIds(userIds);

    if (users.length !== userIds.length) {
      throw new NotFoundException('One or more users not found');
    }

    event.players = users;
    return this.eventRepository.save(event);
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private haversineDistance(
    lat1Str: string, lng1Str: string,
    lat2Str: string, lng2Str: string
  ): number {
    const R = 6371; // Earth's radius in kilometers

    // Convert input strings to numbers
    const lat1 = parseFloat(lat1Str);
    const lng1 = parseFloat(lng1Str);
    const lat2 = parseFloat(lat2Str);
    const lng2 = parseFloat(lng2Str);

    // Convert degrees to radians
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);
    const lat1Rad = this.toRadians(lat1);
    const lat2Rad = this.toRadians(lat2);

    // Haversine formula
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
  }
}
