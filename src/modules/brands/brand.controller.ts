import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Request, Response } from 'express';

@Controller('api/v1/brands')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Get('')
  getAllBrand() {}

  @Get(':id')
  findOneBrand(@Param('id') id: string) {
    console.log(id);
  }

  @Post('')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: memoryStorage(),
      fileFilter: (req, file, cb) => {
        if (
          !file.originalname.match(
            /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|avif|AVIF|webp|WEBP)$/,
          )
        ) {
          req.fileValidationError = 'Only image files are allowed!';
          return cb(null, false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  createBrand(
    @Body() createBrandDto: CreateBrandDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.brandService.createBrand(createBrandDto, res, req);
  }

  @Patch(':id')
  updateBrand(@Param('id') id: string) {
    console.log(id);
  }

  @Delete(':id')
  removeBrand(@Param('id') id: string) {
    console.log(id);
  }
}
