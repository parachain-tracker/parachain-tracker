import { Controller, Get, Delete, Param, Post } from "@nestjs/common"

import { DynamicCronService } from "./dynamic_cron.service"

@Controller("scheduler")
export class DynamicCronController {
    constructor(private readonly cronSchedule: DynamicCronService) {}

    // returns a list of active cron jobs
    @Get()
    public list(): string[] {
        return Array.from(this.cronSchedule['schedule']['scheduler'].jobs.keys())
    }

    // cancels cron jobs by names delimited by ','
    @Delete("cancel/:names") 
    public cancel(@Param('names') names): any {
        try {
            names = names.split(',')
            names.forEach(name => {
                this.cronSchedule.cancelJob(name)
            })
            return true
        } catch(e) {
            return e
        }
    }

    // activates cron jobs by function names delimited by ','
    @Post("activate/:function_names")
    public activate(@Param('function_names') function_names): any {
        try {
            function_names = function_names.split(',')
            function_names.forEach(function_name => {
                this.cronSchedule.activateJob(function_name)
            })
            return true
        } catch (e) {
            console.log(e)
            return e
        }
    }
}
