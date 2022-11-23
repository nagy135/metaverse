import { Model } from '@entities/model.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ModelsController } from './models.controller';
import { ModelsModule } from './models.module';
import { ModelsService } from './models.service';

describe('ModelsService', () => {
  let service: ModelsService;

  const mockModel = new Model();

  mockModel.id = 1;
  mockModel.name = 'name';
  mockModel.filename = 'filename';
  mockModel.userId = 1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ModelsModule],
    })
      .overrideProvider(getRepositoryToken(Model))
      .useValue({
        find: () => mockModel,
        findOne: () => undefined,
      })
      .compile();

    service = module.get<ModelsService>(ModelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fail on random id', () => {
    expect(service.findOneById(99)).rejects.toThrowError(
      new HttpException('Entity not found', HttpStatus.NOT_FOUND),
    );
  });
});
