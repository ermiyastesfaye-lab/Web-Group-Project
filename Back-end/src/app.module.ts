import { Module } from '@nestjs/common';
import { CropsModule } from './crops/crops.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CropsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/agricultural-management'),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}