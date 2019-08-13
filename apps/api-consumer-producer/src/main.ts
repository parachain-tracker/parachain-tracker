import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app/app.module"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.init()
}

bootstrap()
