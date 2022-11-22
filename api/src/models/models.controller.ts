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
  Res,
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
import type { Response } from 'express';

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
  async getFile(
    @Param('id') id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const model = await this.modelsService.findOneById(id);
    res.set({
      ['Content-Type']: 'model/stl',
      ['Content-Disposition']: `attachment; filename="${model.filename}"`,
    });
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
    const stamp = new Date().getTime();
    const newFileName = `${req.user.id}_${stamp}_${file.originalname}`;
    const newPath = `${file.destination}/${newFileName}`;
    fs.renameSync(`${file.path}`, newPath);
    return this.modelsService.createModel(req.user.id, name, newFileName);
  }
}
