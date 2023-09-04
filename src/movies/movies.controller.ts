import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './schemas/movie.schema';
import { MoviesService } from './movies.service';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieQueryDto } from './interfaces/MovieQuery';
import { Paginated } from 'src/interfaces/pagination';
import { CustomAny } from 'src/types/shared';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(@Body() createCatDto: CreateMovieDto): Promise<Movie> {
    try {
      return this.moviesService.create(createCatDto);
    } catch(e: CustomAny) {
      throw new BadRequestException(e.message);
    }
  }

  @Get()
  async findAll(@Query() query: MovieQueryDto): Promise<Paginated<Movie>> {
    try {
      return this.moviesService.findAll(query);
    } catch(e: CustomAny) {
        throw new BadRequestException(e.message);
    }
  }

  @Put(':id')
  async updateMovieById(@Param('id') movieId: string, @Body() updateMovieDto: UpdateMovieDto): Promise<Movie> {
    try {
      return this.moviesService.updateById(movieId, updateMovieDto);
    } catch(e: CustomAny) {
        throw new BadRequestException(e.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return this.moviesService.delete(id);
    } catch(e: CustomAny) {
        throw new BadRequestException(e.message);
    }
  }
}
