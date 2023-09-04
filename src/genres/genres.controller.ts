import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { CustomAny } from 'src/types/shared';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  async create(@Body() createCatDto: CreateGenreDto) {
    try {
      return this.genresService.create(createCatDto);
    } catch(e: CustomAny) {
        throw new BadRequestException(e.message);
    }
  }

  @Get()
  async findAll(): Promise<CreateGenreDto[]> {
    try {
      return this.genresService.findAll();
    } catch(e: CustomAny) {
        throw new BadRequestException(e.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return this.genresService.delete(id);
    } catch(e: CustomAny) {
        throw new BadRequestException(e.message);
    }
  }
}
