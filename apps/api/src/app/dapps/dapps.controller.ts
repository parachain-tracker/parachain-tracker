import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    ValidationPipe,
} from "@nestjs/common"
import { DappsService } from "./dapps.service"
import { DappDto } from "@parachain-tracker/api-interfaces"

@Controller("dapps")
export class DappsController {
    constructor(private dapps: DappsService) {}

    @Get()
    public list(): Promise<DappDto[]> {
        return this.dapps.list()
    }

    @Get(":id")
    public get(@Param("id", ParseIntPipe) id: number): Promise<DappDto> {
        return this.dapps.get(id)
    }

    @Post()
    public create(model): Promise<DappDto> {
        return this.dapps.save(model)
    }

    @Patch(":id")
    public modify(
        @Param("id", ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) model: DappDto,
    ): Promise<DappDto> {
        return this.dapps.save({
            ...model,
            id,
        })
    }

    @Put(":id")
    public replace(
        @Param("id", ParseIntPipe) id: number,
        @Body() model: DappDto,
    ): Promise<DappDto> {
        return this.dapps.save({
            ...model,
            id,
        })
    }

    @Delete(":id")
    public async delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
        await this.dapps.delete(id)
    }
}
