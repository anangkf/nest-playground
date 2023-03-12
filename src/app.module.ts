import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    // configure env vars
    ConfigModule.forRoot({
      // enable env vars globally
      isGlobal: true,
    }),
    // connect mongodb
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ProductModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
