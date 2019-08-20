import { IsNumberString, IsOptional, IsString } from "class-validator"
import { ProjectType } from "../api-interfaces"

export class RankingSearchDto {
    @IsNumberString()
    @IsOptional()
    public limit?: string | number

    @IsString()
    public type: ProjectType | keyof typeof ProjectType
}
