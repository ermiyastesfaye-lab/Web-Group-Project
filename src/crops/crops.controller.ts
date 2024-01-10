import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CropsService } from './crops.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post()
  @UseGuards(JwtGuard)
  async addCrops(
    @Body('name') cropName: string,
    @Body('plantingField') plantingField: string,
    @Body('harvestingDate') harvestingDate: Date,
    @Body('cropType') cropType: string,
    @Body('plantingDate') plantingDate: Date,
  ) {
    const generatedId = await this.cropsService.addCrop(cropName, plantingField, harvestingDate, cropType, plantingDate);
    return { Id: generatedId };
  }

  @Get()
  @UseGuards(JwtGuard)
  async getAllCrops() {
    const crops = await this.cropsService.getCrops();
    return crops;
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  getCrop(@Param('id') cropId: string) {
    return this.cropsService.getSingleCrop(cropId);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  async updateCrop(
    @Param('id') cropId: string,
    @Body('name') cropName: string,
    @Body('plantingField') plantingField: string,
    @Body('harvestingDate') harvestingDate: Date,
    @Body('cropType') cropType: string,
    @Body('plantingDate') plantingDate: Date,
  ) {
    await this.cropsService.updateCrop(cropId, cropName, plantingField, harvestingDate, cropType, plantingDate);
    return "crop details updated";
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async removeCrop(@Param('id') cropId: string) {
    await this.cropsService.deleteCrop(cropId);
    return 'you have succesfully deleted the crop details';
  }
}
