import { Allow, IsNumber, IsOptional, IsString, MaxLength } from "class-validator"
import { TickerCoord, TickerTrend } from "../api-interfaces"

export class TickerDto {
    @IsOptional()
    @IsNumber()
    public id?: number

    @IsString()
    @MaxLength(32)
    public name!: string

    @IsNumber()
    public project_id!: number

    @Allow()
    public coords!: TickerCoord[]

    @Allow()
    public trends!: TickerTrend[]
}
