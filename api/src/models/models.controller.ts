import * as fs from 'fs';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  // FileTypeValidator,
  // ParseFilePipe,
  Post,
  Req,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ModelsService } from './models.service';
import { Model } from '@entities/model.entity';
import { join } from 'path';
import { RequestWithJwtUser } from 'src/types/common';

@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  async getModels(@Req() req: RequestWithJwtUser): Promise<Model[]> {
    return this.modelsService.findAllByUserId(req.user.id);
  }

  @Get(':id')
  async getModel(@Param('id') id: number): Promise<Model> {
    return this.modelsService.findOneById(id);
  }

  @Get('file/:id')
  async getFile(@Param('id') id: number): Promise<StreamableFile> {
    const model = await this.modelsService.findOneById(id);
    return new StreamableFile(
      fs.createReadStream(join(process.cwd(), `upload/${model.filename}`)),
    );
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './upload',
    }),
  )
  @Post()
  async create(
    @UploadedFile()
    file: // new ParseFilePipe({
    //   validators: [new FileTypeValidator({ fileType: /.stl$/ })],
    // }),
    Express.Multer.File,
    @Body('name') name: string,
    @Req() req: RequestWithJwtUser,
  ) {
    const newFileName = `${req.user.id}__${file.originalname}`;
    fs.renameSync(`${file.path}`, `${file.destination}/${newFileName}`);
    return this.modelsService.createModel(
      req.user.id,
      name,
      newFileName,
    );
  }
}
