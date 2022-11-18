import { Model } from '@entities/model.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ModelsService {

  @InjectRepository(Model) private modelRepository: Repository<Model>

  async createModel (
    userId: number,
    name: string,
    filename: string,
  ) {
    const model = this.modelRepository.create({
      name,
      userId,
      filename
    })

    await model.save();
  }
}
