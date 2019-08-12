import { Global, Module } from "@nestjs/common"
import { GithubJob } from "./github.job"
import { TestJob } from "./test.job"

export interface Job {
    run(): any
}

export const JOBS = "JOBS"

const JobProviders = [
    TestJob,
    GithubJob,
    {
        provide: JOBS,
        useValue: [TestJob, GithubJob],
    },
]

@Global()
@Module({
    providers: JobProviders,
    exports: [TestJob, GithubJob, JOBS],
})
export class JobsModule {}
