import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './schemas/movie.schema';
import { CreateMovie, CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovie, UpdateMovieDto } from './dto/update-movie.dto';
import { MovieQuery } from './interfaces/MovieQuery';
import { Paginated } from 'src/interfaces/pagination';
import { CustomAny } from 'src/types/shared';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private readonly movieModel: Model<Movie>) {}

  async create(createMovieDto: CreateMovie): Promise<Movie> {
    const createdMovie = await this.movieModel.create(createMovieDto);

    return createdMovie;
  }

  async findAll(query: MovieQuery): Promise<Paginated<Movie>> {
    const { page, limit } = query;

    const skip = (page - 1) * limit;

    const result: unknown = await this.movieModel.aggregate([
      {
        $lookup: {
          from: 'genres',
          localField: 'genres',
          foreignField: '_id',
          as: 'genres',
        },
      },
      {
        $match: {
          'genres.name': query.genres ? { $in: query.genres } : {$ne: null},
          title: query.title ? { $regex: query.title } : { $ne: null }
        },
      },
      { '$facet'    : {
        pagination: [ { $count: "totalElems" }, { $addFields: { page: page } } ],
        content: [ { $skip: skip }, { $limit: limit } ]
    } }
    ]);

    return result as Paginated<Movie>;
  }

  async updateById(movieId: string, updateMovieDto: UpdateMovie): Promise<Movie> {
    return this.movieModel.findByIdAndUpdate(movieId, { $set: updateMovieDto }, { new: true });
  }

  async delete(id: string) {
    const deletedMovie = await this.movieModel
      .findByIdAndRemove({ _id: id })
      .exec();

    return deletedMovie;
  }
}
