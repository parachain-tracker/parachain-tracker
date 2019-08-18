import { Connection } from "typeorm"
import { Factory, Seeder, times } from "typeorm-seeding"
import { ProjectEntity } from "../../libs/models/src/entity/project.entity"
import { CategoryEntity } from "../../libs/models/src/entity/category.entity"
import { ExternalLinkEntity } from "../../libs/models/src/entity/external-link.entity"
import * as faker from "faker"
import { TickerEntity } from "../../libs/models/src/entity/ticker.entity"

const links = ["twitter", "medium", "reddit", "telegram", "riot"]

function getRandomSubarray(arr, size) {
    const shuffled = arr.slice(0)
    let i = arr.length
    while (i--) {
        const index = Math.floor((i + 1) * Math.random())
        const temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
    }
    return shuffled.slice(0, size)
}
export default class CreateDapps implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager()
        const linkCount = links.length

        const linkEntities = await times(linkCount, async i => {
            const link = await factory(ExternalLinkEntity)({
                name: links[i],
                url: faker.internet.url(),
            }).make()

            await em.save(link)

            return link
        })

        await times(10, async n => {
            const randomLinks = getRandomSubarray(linkEntities, linkCount)
            let project = await factory(ProjectEntity)().make()
            const tickerFactory = factory(TickerEntity)

            project.category = await factory(CategoryEntity)().make()
            project.externalLinks = randomLinks

            await em.save(project.category)

            project = await em.save(project)

            const tickers = [
                await tickerFactory({ name: "Users", labels: ["1d", "7d", "30d"], project }).make(),
                await tickerFactory({
                    name: "Transactions",
                    labels: ["1d", "7d", "30d"],
                    project,
                }).make(),
                await tickerFactory({
                    name: "Volume (DAI)",
                    labels: ["1d", "7d", "30d"],
                    project,
                }).make(),
                await tickerFactory({
                    name: "Developer Activity",
                    labels: ["30d", "90d"],
                    project,
                }).make(),
            ]

            await em.save(tickers)
        })
    }
}
