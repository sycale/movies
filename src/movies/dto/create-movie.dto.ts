import { Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export interface CreateMovie {
  title: string;
  description: string;
  releaseDate: Date;
  genres: string[]
}

export class CreateMovieDto implements CreateMovie {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  @Transform( ({ value }) => new Date(value))
  @IsDate()
  readonly releaseDate: Date;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  readonly genres: string[];
}
