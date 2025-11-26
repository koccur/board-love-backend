import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Spot } from '../spot/spot.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,Spot])],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService,AuthService]
})
export class UserModule {}
