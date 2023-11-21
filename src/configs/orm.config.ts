import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { User } from '../modules/users/entity/user.entity';
import { Carts } from '../modules/carts/entity/cart.entity';
import { CartDetail } from '../modules/carts/entity/cart_detail.entity';
import { ProductDetail } from '../modules/products/entity/product_details.entity';
import { ProductVariant } from '../modules/products/entity/product_variant.entity';
// import { Order } from '../modules/orders/entity/order.entity';
// import { Payment } from '../modules/payment/entity/payment.entity';
// import { Payment_Status } from '../modules/payment/entity/payment_status.entity';
import { Brands } from '../modules/brands/entity/brands.entity';
import { CateGory } from '../modules/category/entity/category.entity';
import { Product } from '../modules/products/entity/product.entity';
import { Size } from '../modules/size/entity/size.entity';
import { ImageShow } from '../modules/imageshow/entity/imageshow.entity';
import { Color } from '../modules/color/entity/color.entity';
import { Collection } from '../modules/collections/entity/collection.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'vuvanbui@18',
    database: process.env.DB_NAME_DATABASE || 'demonest',
    entities: [
      User,
      Carts,
      CartDetail,
      ProductDetail,
      ProductVariant,
      // Order,
      // Payment,
      // Payment_Status,
      Brands,
      CateGory,
      Collection,
      Product,
      Size,
      ImageShow,
      Color,
    ],
    synchronize: true,
  }),
);
