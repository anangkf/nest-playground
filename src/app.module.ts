import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import { AppController } from './app.controller';
import { ValidateMongoID } from './middleware/ValidateMongoID';
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
    // added rate limiter
    ThrottlerModule.forRoot({
      // set max request to server to 5 request per second
      ttl: 1,
      limit: 5,
    }),
  ],
  controllers: [AppController],
  // provide ThrottlerGuard (rate limiter)
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // added middleware validating mongoID
    consumer.apply(ValidateMongoID).forRoutes('*');
  }
}
