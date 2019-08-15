import { define } from "typeorm-seeding"
import * as Faker from "faker"
import { TickerEntity } from "../entity/ticker.entity"
import { ProjectEntity } from "../entity/project.entity"

const now = Date.now()
const dates = Array.from({ length: 24 }, (_, index) => now - 3600 * index)

define(TickerEntity, (
    faker: typeof Faker,
    settings: { name: string; labels: string[]; project: ProjectEntity },
) => {
    const ticker = new TickerEntity()

    ticker.name = settings.name

    ticker.coords = dates.map(x => ({
        x,
        y: faker.random.number({ min: 100, max: 1000 }),
    }))

    ticker.trends = settings.labels.map(label => ({
        label,
        value: faker.random.number({ min: 0, max: 40000 }),
    }))

    ticker.project = settings.project

    return ticker
})
