import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

//const test = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
//console.log(`${test}`);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        //const test = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
        //console.log(`${test}`);
        //console.log('DB_DATABASE =', configService.get<string>('DB_DATABASE'));
        return {
          type: 'mssql',
          host: configService.get<string>('DB_SERVER'),
          port: Number(configService.get<number>('DB_DATABASE_PORT')),
          username: configService.get<string>('DB_OWNER_USERNAME'),
          password: configService.get<string>('DB_OWNER_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [User],
          synchronize: true,
          options: {
            encrypt: configService.get<string>('DB_ENCRYPT') === 'true',
            trustServerCertificate:
              configService.get<string>('DB_TRUST_CERTIFICATES') === 'true',
          },
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
