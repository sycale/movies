import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { PaginationQuery } from "src/interfaces/pagination";

export interface MovieQuery extends PaginationQuery {
    title?: string;
    genres?: string[];
}

export class MovieQueryDto implements MovieQuery {
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    page: number;

    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    limit: number;

    @IsString()
    @IsOptional()
    title?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    genres: string[]

}