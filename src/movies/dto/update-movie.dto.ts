import { Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export interface UpdateMovie {
    title?: string;
    description?: string;
    releaseDate?: Date,
    genres?: string[],
}
export class UpdateMovieDto implements UpdateMovie {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsOptional()
  @Transform( ({ value }) => new Date(value))
  @IsDate()
  readonly releaseDate?: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly genres?: string[];
}
