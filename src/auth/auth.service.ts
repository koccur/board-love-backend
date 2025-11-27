import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUser, CreateUserDto, UpdatePasswordDto } from '../user/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from '../user/user.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOneBy({ email: ILike(email) });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async changePassword(changePassword: UpdatePasswordDto) {
    const user = await this.userRepository.findOneBy({ email: ILike(changePassword.email) });
    return await this.userRepository.update(user.id, { password: this.saltPassoword(changePassword.password) });
  }

  saltPassoword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

async create(createUserDto: CreateUserDto): Promise<AuthUser> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save({ ...newUser, password: this.saltPassoword(newUser.password) });
  }
}



