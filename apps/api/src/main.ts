/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from "@nestjs/core"

import { AppModule } from "./app/app.module"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const globalPrefix = "api"
    app.setGlobalPrefix(globalPrefix)
    app.useGlobalPipes(
        new ValidationPipe({
            forbidNonWhitelisted: true,
        }),
    )
    const port = process.env.port || 3333
    await app.listen(port, () => {
        console.log("Listening at http://localhost:" + port + "/" + globalPrefix)
    })
}

bootstrap()