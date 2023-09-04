import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from './schemas/genre.schema';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenresService {
  constructor(@InjectModel(Genre.name) private readonly genreModel: Model<Genre>) {}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const createdGenre = await this.genreModel.create(createGenreDto);
    return createdGenre;
  }

  async findAll(): Promise<Genre[]> {
    return this.genreModel.find().exec();
  }

  async findOne(id: string): Promise<Genre> {
    return this.genreModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    await this.genreModel
      .deleteOne({ _id: id })
  }
}
