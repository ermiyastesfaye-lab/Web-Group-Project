import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CropsService } from './crops.service';
import { CropsController } from './crops.controller';
import { cropSchema } from './crops.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: 'Crop', schema: cropSchema}])],
  controllers: [CropsController],
  providers: [CropsService],
})
export class CropsModule {}
