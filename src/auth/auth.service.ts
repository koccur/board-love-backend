import { HttpCode, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUser, CreateUserDto, UpdatePasswordDto } from '../user/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { of } from 'rxjs';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    debugger;
    const user = await this.userRepository.findOneBy({ email: ILike(email) });
    if (user === null || user.email !== email) {
      throw new NotFoundException('User with this email does not exist');
    }
    if (!bcrypt.compareSync(pass,user?.password)) {
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
    return bcrypt
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

async create(createUserDto: CreateUserDto): Promise<AuthUser> {
    const newUser = this.userRepository.create(createUserDto);
    let result;
    try {
      const saltedPassword = this.saltPassoword(newUser.password);
      result = await this.userRepository.save({ ...newUser, password: this.saltPassoword(newUser.password) });
      result = of({message:"Account has been created successfully"});
    } catch (error) {
      result = of({message:"Account cannot be created, email is in use"});
    }
    return  result
  }
}



