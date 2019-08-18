import { Module, OnModuleInit } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConnectionOptions } from "typeorm"
import { ProjectModule } from "./project/project.module"

import { CategoryEntity, ExternalLinkEntity, ProjectEntity } from "@parachain-tracker/models"
import { JobsModule } from "./jobs/jobs.module"
import { ProjectService } from "./project/project.service"
import { GithubJob } from "./jobs/github.job"

const ormconfig = require("../../../../ormconfig.json")

delete ormconfig.migrations

const connectionOptions: ConnectionOptions = {
    ...ormconfig,
    entities: [ProjectEntity, CategoryEntity, ExternalLinkEntity],
}

@Module({
    imports: [TypeOrmModule.forRoot(connectionOptions), ProjectModule, JobsModule],
    controllers: [],
    providers: [],
})
export class AppModule implements OnModuleInit {
    constructor(private project: ProjectService, private github: GithubJob) {}

    public async onModuleInit() {
        console.log("Initialize jobs")
        await this.project.run()
        await this.github.run()
        setInterval(async () => {
            await this.github.run()
        }, 3600)
    }
}
