import { Inject, Injectable, OnModuleInit, Type } from "@nestjs/common"
import { InjectSchedule, Schedule } from "nest-schedule"
import { Job, JOBS } from "../jobs/jobs.module"

@Injectable()
export class DynamicCronService implements OnModuleInit {
    activeAPIJobs: {}

    constructor(
        @InjectSchedule() private readonly schedule: Schedule,
        @Inject(JOBS) private jobs: Type<Job>[],
    ) {
        this.activeAPIJobs = {}
    }

    // schedule the jobs inside onmoduleinit to have them run as the app starts
    // read https://www.npmjs.com/package/nest-schedule for more info
    onModuleInit(): any {
        // this.sampleJobTwo()
    }

    sampleJob() {
        // runs every 10 seconds
        this.schedule.scheduleCronJob("my-job", "*/10 * * * * *", () => {
            console.log("executing my custom cron job")
            return false // return true to stop the job from running again
        })
    }

    sampleJobTwo() {
        this.schedule.scheduleCronJob("my-job2", "*/10 * * * * *", () => {
            console.log("executing my custom cron job2")
            return false // return true to stop the job from running again
        })
    }

    activateJob(name: string, cron: string, run: string) {
        if (this.activeAPIJobs[name]) {
            return false
        }

        const job_class = this.jobs.find(job => job.name === name)
        if (job_class) {
            this.activeAPIJobs[name] = { job: new job_class(), remaining: !run ? run : "inf" }
        } else return false

        this.schedule.scheduleCronJob(name, cron, () => {
            this.activeAPIJobs[name].job.run()
            if (this.activeAPIJobs[name].remaining != "inf")
                return !--this.activeAPIJobs[name].remaining
            else return false
        })

        return true
    }

    cancelJob(name: string) {
        if (this.activeAPIJobs[name]) {
            this.schedule.cancelJob(name)
            delete this.activeAPIJobs[name]
            return true
        } else if (this.schedule["scheduler"].jobs.has(name)) {
            this.schedule.cancelJob(name)
            return true
        }
        return false
    }
}
