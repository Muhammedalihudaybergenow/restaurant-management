import { Global, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OrderTypesModule } from './order-types/order-types.module';
import { OrdersModule } from './orders/orders.module';
import { AuthenticationsModule } from './authentications/authentications.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { IsEntityExistsConstraint } from './common/validators';
import { IsUniqueConstraint } from './common/validators/is-unique-check.validator';
import { FilesModule } from './files/files.module';
@Global()
@Module({
  imports: [
    UsersModule,
    OrderTypesModule,
    OrdersModule,
    AuthenticationsModule,
    RestaurantsModule,
    ConfigModule.forRoot({
      cache: true,
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        database: config.get('DATABASE_NAME'),
        password: config.get('DATABASE_PASSWORD'),
        username: config.get('DATABASE_USERNAME'),
        autoLoadEntities: true,
        synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
        entities: [join(__dirname, '**/*.entity{.ts,.js}')],
        host: config.get('DATABASE_HOST'),
        port: config.get('DATABASE_PORT')
          ? parseInt(config.get('DATABASE_PORT'))
          : 5432,
        logger: 'simple-console',
        logging: true,
      }),
    }),
    FilesModule,
  ],
  providers: [IsEntityExistsConstraint, IsUniqueConstraint],
})
export class AppModule {}
