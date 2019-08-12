import { Injectable } from "@nestjs/common"
import { Job } from "./jobs.module"

@Injectable()
export class GithubJob implements Job {
    run() {
        // to be done
        console.log("running github job")
    }
}
