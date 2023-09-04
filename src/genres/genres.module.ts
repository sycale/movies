import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';

import { Genre, GenreSchema } from './schemas/genre.schema';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { Model } from 'mongoose';
import { Movie, MovieSchema } from 'src/movies/schemas/movie.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([
    {
      name: Genre.name,
      useFactory: (movieModel: Model<Movie>) => {
        const schema = GenreSchema;

        schema.pre('deleteOne', async function(next) {
          const { _id } = this.getFilter();
          await movieModel.updateMany({ genres: _id } , {$pull: {genres: _id}})

          next();
        });

        return schema;
      },
      inject: [getModelToken('Movie')]
    },
    {
      name: Movie.name,
      useFactory: () => MovieSchema,
    }
  ])],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
