import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator"

export class CategoryDto {
    @IsOptional()
    @IsNumber()
    public id?: number

    @IsString()
    @MaxLength(32)
    public name: string
}
