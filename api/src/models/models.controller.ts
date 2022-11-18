import * as fs from 'fs';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  // FileTypeValidator,
  // ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ModelsService } from './models.service';

@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './upload',
    }),
  )
  @Post()
  async create(
    @UploadedFile()
    // new ParseFilePipe({
    //   validators: [new FileTypeValidator({ fileType: /.stl$/ })],
    // }),
    file: Express.Multer.File,
    @Body('name') name: string,
    @Req() req: any,
  ) {
    fs.renameSync(`${file.path}`, `${file.destination}/${file.originalname}`);
    return this.modelsService.createModel(
      req.user.id as number,
      name,
      file.originalname,
    );
  }
}
