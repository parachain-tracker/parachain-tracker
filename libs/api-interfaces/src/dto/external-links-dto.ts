import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator"

export class ExternalLinksDto {
    @IsOptional()
    @IsNumber()
    public id?: number

    @IsString()
    @MaxLength(32)
    public name!: string

    @IsString()
    public url!: string
}
