import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UpdatePasswordDto } from '../user/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async changePassword(changePassword: UpdatePasswordDto) {
    const user = await this.usersService.findOneByEmail(changePassword.email);

    return await this.userRepository.update(user.id, { password: this.saltPassoword(changePassword.password) });
  }

  saltPassoword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
}



