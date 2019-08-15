/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from "@nestjs/core"

import { AppModule } from "./app/app.module"
import { environment } from "./environments/environment"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const globalPrefix = "api-consumer-producer"
    app.setGlobalPrefix(globalPrefix)
    const port = 3334
    await app.listen(port, () => {
        if (environment.production === false) {
            console.log("Listening at http://localhost:" + port + "/" + globalPrefix)
        }
    })
}

bootstrap()
