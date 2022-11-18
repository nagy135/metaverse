import { AuthModule } from '@auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModelsModule } from './models/models.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'metaverse',
      password: 'metaverse',
      database: 'metaverse',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ModelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
