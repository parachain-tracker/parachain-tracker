import { define } from "typeorm-seeding"
import { ProjectEntity } from "../entity/project.entity"
import * as Faker from "faker"

define(ProjectEntity, (faker: typeof Faker) => {
    const dapp = new ProjectEntity()

    dapp.name = faker.commerce.productName()
    dapp.commits = faker.random.number(10000)
    dapp.stars = faker.random.number(100000)
    dapp.description = faker.lorem.paragraphs(faker.random.number(5))
    dapp.developer = faker.company.companyName()
    dapp.status = faker.random.number({ min: 0, max: 1 })
    dapp.network = faker.commerce.productName()
    dapp.link = faker.internet.url()

    return dapp
})
