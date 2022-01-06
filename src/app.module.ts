import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from 'src/users/users.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'ec2-44-194-101-60.compute-1.amazonaws.com',
      port: 5432,
      username: 'nozandputlsbxs',
      password:
        'e07b4c1e99f0630c4d2dfb1922ef474e099f8a4b6461f195decb999aae2e0b08',
      database: 'dcm4j90eu5e8g0',
      models: [User],
      synchronize: true,
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
