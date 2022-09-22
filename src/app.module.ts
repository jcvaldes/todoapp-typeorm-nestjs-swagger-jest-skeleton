import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mariadb',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'todoapp_user',
    //   password: 'secreto',
    //   database: 'todoapp_dev',
    //   entities: [],
    //   synchronize: true,
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('DB_HOST', 'localhost'),
        port: Number(configService.get('DB_PORT', 3306)),
        username: configService.get('DB_USERNAME', 'todoapp_user'),
        password: configService.get('DB_PASSWORD', 'secreto'),
        database: configService.get('DB_DATABASE', 'todoapp_dev'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
      }),
    }),
    TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
