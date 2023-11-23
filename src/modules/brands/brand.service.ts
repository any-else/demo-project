import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brands } from './entity/brands.entity';
import { Repository } from 'typeorm';
import { createBrandService } from '../../types/type-service';
import { Request, Response } from 'express';
import { v2 } from 'cloudinary';
@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brands)
    private readonly brandRepository: Repository<Brands>,
  ) {}

  // tìm tất cả các brands
  async findBrands() {
    try {
      const brands = await this.brandRepository.find();
      return {
        status: 'success',
        brands: brands,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  // tạo mới brands
  async createBrand(
    createBrandDetail: createBrandService,
    res: Response,
    req: Request,
  ) {
    try {
      // nếu như mà tạo bình thường thì không cần hình ảnh
      const newBrand = await this.brandRepository.create({
        brand_name: createBrandDetail.brand_name,
      });
      // nếu có hình ảnh thì ..
      if (req.files && Array.isArray(req.files)) {
        return await Promise.all(
          req.files.map((file) => {
            return new Promise(async (resolve, reject) => {
              const { originalname, buffer, fieldname } = file;
              if (fieldname === 'image_brand') {
                v2.uploader
                  .upload_stream(
                    {
                      folder: 'my_image_product_amazon',
                      public_id: originalname.split('.')[0],
                      resource_type: 'image',
                    },
                    (error, result) => {
                      if (error) {
                        console.error(error);
                        reject(error);
                      } else {
                        newBrand.image_brand = result.url;
                        resolve(result);
                      }
                    },
                  )
                  .end(buffer);
              }
            });
          }),
        );
      }
      const saveBrand = await this.brandRepository.save(newBrand);
      return res.status(201).json({
        status: 'success',
        brand: {
          ...saveBrand,
          product_length: 0,
        },
      });
    } catch (err) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
