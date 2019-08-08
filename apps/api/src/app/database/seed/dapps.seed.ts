import { Connection } from "typeorm"
import { Factory, Seeder, times } from "typeorm-seeding"
import { ProjectEntity } from "../entity/project.entity"
import { CategoryEntity } from "../entity/category.entity"
import { ExternalLinkEntity } from "../entity/external-link.entity"
import * as faker from "faker"

const links = ["twitter", "medium", "reddit", "facebook", "chat"]

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
            const project = await factory(ProjectEntity)().make()
            project.category = await factory(CategoryEntity)({ roles: ["admin"] }).make()
            project.externalLinks = randomLinks

            await em.save(project.category)
            await em.save(project)
        })
    }
}
