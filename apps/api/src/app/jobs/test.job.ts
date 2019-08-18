import { Injectable } from "@nestjs/common"
import { Job } from "./jobs.module"

@Injectable()
export class TestJob implements Job {
    run() {
        console.log("running test job")
    }
}
