import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Genre } from '../../genres/schemas/genre.schema';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  releaseDate: Date;

  @Prop({ required: true, type: [Types.ObjectId], ref: Genre.name })
  genres: Genre[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
