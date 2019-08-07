import { Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common"
import { DappsService } from "./dapps.service"

@Controller("dapps")
export class DappsController {
    constructor(private dapps: DappsService) {}

    @Get()
    public list() {
        return this.dapps.list()
    }

    @Get(":id")
    public get(@Param("id", ParseIntPipe) id: number) {
        return this.dapps.get(id)
    }

    @Post()
    public create(model) {
        return this.dapps.save(model)
    }

    @Patch()
    public modify(model) {
        return this.dapps.save(model)
    }

    @Put()
    public replace(model) {
        return this.dapps.save(model)
    }

    @Delete(":id")
    public delete(@Param("id", ParseIntPipe) id: number) {
        return this.dapps.delete(id)
    }
}
