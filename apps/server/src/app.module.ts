import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { RoomsService } from './rooms/rooms.service';
import { GamesService } from './games/games.service';
import { GameGateway } from './websocket/game.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [PrismaService, RoomsService, GamesService, GameGateway]
})
export class AppModule {}
