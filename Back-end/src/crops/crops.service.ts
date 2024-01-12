import { Injectable, NotFoundException } from '@nestjs/common';
import { Crop } from './crops.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CropsService {
  private crops: Crop[] = [];
  constructor(@InjectModel('Crop') private readonly cropModel: Model<Crop>) {}

  async addCrop(
    name: string,
    plantingField: string,
    harvestingDate: Date,
    cropType: string,
    plantingDate: Date,
  ) {
    const newCrop = new this.cropModel({
      name,
      plantingField,
      harvestingDate,
      cropType,
      plantingDate,
    });
    const result = await newCrop.save();
    return result.id as string;
  }

  async getCrops() {
    const crops = await this.cropModel.find().exec();
    return crops.map(crop => ({
      id: crop.id,
      name: crop.name,
      plantingField: crop.plantingField,
      harvestingDate: crop.harvestingDate,
      cropType: crop.cropType,
      plantingDate: crop.plantingDate,
    }));
  }

  async getSingleCrop(cropId: string) {
    const crop = await this.findCrop(cropId);
    return {
      id: crop.id,
      name: crop.name,
      plantingField: crop.plantingField,
      harvestingDate: crop.harvestingDate,
      cropType: crop.cropType,
      plantingDate: crop.plantingDate,
    };
  }

  async updateCrop(
    cropId: string,
    name: string,
    plantingField: string,
    harvestingDate: Date,
    cropType: string,
    plantingDate: Date,
  ) {
    const updatedCrop = await this.findCrop(cropId);
    if (name) {
      updatedCrop.name = name;
    }
    if (plantingField) {
      updatedCrop.plantingField = plantingField;
    }
    if (harvestingDate) {
      updatedCrop.harvestingDate = harvestingDate;
    }
    if (cropType) {
      updatedCrop.cropType = cropType;
    }
    if (plantingDate) {
      updatedCrop.plantingDate = plantingDate;
    }
    updatedCrop.save();
  }

  async deleteCrop(cropId: string) {
    const result = await this.cropModel.deleteOne({_id: cropId}).exec();
    if (!result) {
      throw new NotFoundException('Crop not found .');
    }
  }

  private async findCrop(id: string): Promise<Crop> {
    let crop: Crop | PromiseLike<Crop>;
    try {
      crop = await this.cropModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Crop not found.');
    }
    if (!crop) {
      throw new NotFoundException('Crop not found.');
    }
    return crop;
  }
}
