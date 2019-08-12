import { Controller, Delete, Get, Param, Post } from "@nestjs/common"
import { DynamicCronService } from "./dynamic_cron.service"

@Controller("scheduler")
export class DynamicCronController {
    constructor(private readonly cronSchedule: DynamicCronService) {}

    // returns a list of active cron jobs
    // sample request: localhost:3333/api/scheduler/
    @Get()
    public list(): any {
        let pushed = {}
        let list = Object.keys(this.cronSchedule.activeAPIJobs).map(key => {
            pushed[key] = true
            return { name: key, remaining: this.cronSchedule.activeAPIJobs[key].remaining }
        })
        this.cronSchedule["schedule"]["scheduler"].jobs.forEach((value, key, map) => {
            if (!pushed[key]) list.push({ name: key, remaining: "uknwn" })
        })
        return list
    }

    @Get("avail")
    public avail(): any {
        return this.cronSchedule["jobs"].map(job => job.name)
    }

    // cancels cron jobs by names delimited by ','
    // sample request: localhost:3333/api/scheduler/cancel/GithubJob,TestJob
    @Delete("cancel/:names")
    public cancel(@Param("names") names): any {
        try {
            names = names.split(",")
            let result = []
            names.forEach(name => {
                if (!this.cronSchedule.cancelJob(name)) result.push(name)
            })
            if (result.length !== 0)
                return {
                    success: false,
                    failed: result,
                    message: `Failed to cancel jobs: ${result.toString()}. Please make sure that the job(s) are registered or active`,
                }
            return { success: true }
        } catch (e) {
            return e
        }
    }

    // ACTIVATES CRON JOBS
    // length of 'names', 'corns' and 'once' must be same.
    // schedule will activate a job using names[i], crons[i], runs[i]
    // names - delimited by ',' : name of the job
    // crons - delimited by ',' : cron schedule (ex- 4-5-*-*-*) dashes will be replaced to whitespaces
    //                            (ex2 - 10s interval - *%2F10-*-*-*-*) %2F corresponds to a '/'
    // runs - delimited by ',' : specifies how many times the job should be ran
    //                           if run = 0, the job will be evergreen
    // sample request: localhost:3333/api/scheduler/activate/GithubJob,TestJob/*%2F10-*-*-*-*-*,*%2F10-*-*-*-*-*/0,0
    @Post("activate/:names/:crons/:runs")
    public activate(@Param() params): any {
        try {
            let { names, crons, runs } = params

            names = names.split(",")
            crons = crons.split(",")
            runs = runs.split(",")

            if (names.length !== crons.length && names.length !== runs.length) {
                return {
                    success: false,
                    message: "Please ensure that all params have the same length",
                }
            }

            let result = []
            for (let i = 0; i < names.length; i++) {
                if (
                    !this.cronSchedule.activateJob(names[i], crons[i].replace(/-/g, " "), runs[i])
                ) {
                    result.push(names[i])
                }
            }

            if (result.length !== 0)
                return {
                    success: false,
                    failed: result,
                    message: `Failed to activate jobs: ${result.toString()}. Please check if the job(s) is(are) registered or already active`,
                }

            return { success: true }
        } catch (e) {
            return e
        }
    }
}
