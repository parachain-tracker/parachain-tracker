import { IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator"
import { ProjectStatus } from "../api-interfaces"
import { Type } from "class-transformer"
import { ExternalLinksDto } from "./external-links-dto"
import { CategoryDto } from "./category-dto"

export class ProjectDto {
    @IsOptional()
    @IsNumber()
    public id?: number

    @IsString()
    @MaxLength(256)
    public name!: string

    @IsString()
    @MaxLength(256)
    public developer!: string

    @IsString()
    public description!: string

    @IsNumber()
    public status!: ProjectStatus

    @IsString()
    public link!: string

    @IsNumber()
    public stars!: number

    @IsNumber()
    public commits!: number

    @MaxLength(32)
    public network!: string

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ExternalLinksDto)
    public externalLinks?: ExternalLinksDto[]

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryDto)
    public category?: CategoryDto
}
