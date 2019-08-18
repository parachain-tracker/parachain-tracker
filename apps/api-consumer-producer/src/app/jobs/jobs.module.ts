import { Global, HttpModule, Module } from "@nestjs/common"
import { GithubJob } from "./github.job"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ProjectEntity } from "@parachain-tracker/models"

export interface Job {
    run(): any
}

export const JOBS = "JOBS"

const JobProviders = [
    GithubJob,
    {
        provide: JOBS,
        useValue: [GithubJob],
    },
]

@Global()
@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([ProjectEntity])],
    providers: [...JobProviders],
    exports: [...JobProviders],
})
export class JobsModule {}
