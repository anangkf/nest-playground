import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({ type: Date, default: new Date().toISOString() })
  created_at: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
