import { Model } from '@entities/model.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ModelsService {
  @InjectRepository(Model) private modelRepository: Repository<Model>;

  async createModel(userId: number, name: string, filename: string) {
    const model = this.modelRepository.create({
      name,
      userId,
      filename,
    });

    await model.save();
  }

  async findOneById(id: number): Promise<Model> {
    const model = await this.modelRepository.findOne(id)
    if (model)
      return model;
    else
      throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
  }

  async findAllByUserId(userId: number): Promise<Model[]> {
    return this.modelRepository.find({ where: { userId } });
  }
}
