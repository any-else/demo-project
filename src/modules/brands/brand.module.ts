import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brands } from './entity/brands.entity';
import { CloudinaryModule } from 'nestjs-cloudinary';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Brands]),
    CloudinaryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        imports: [ConfigModule],
        isGlobal: true,
        cloud_name: configService.get('CLOUD_NAME') || 'dwp2mf9u3',
        api_key: configService.get('API_CLOUD_KEY') || 469293222965499,
        api_secret:
          configService.get('API_CLOUD_SECRET') ||
          'fQf9nUfnUm_7S-036Q4WQjaa-JA',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [],
})
export class BrandModule {}
