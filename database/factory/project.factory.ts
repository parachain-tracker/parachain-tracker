import { define } from "typeorm-seeding"
import { ProjectEntity } from "@parachain-tracker/models"
import * as Faker from "faker"

define(ProjectEntity, (faker: typeof Faker) => {
    const project = new ProjectEntity()

    project.type = faker.random.number({ min: 0, max: 1 })
    project.name = faker.commerce.productName()
    project.commits = faker.random.number(10000)
    project.stars = faker.random.number(100000)
    project.description = faker.lorem.paragraphs(faker.random.number(5))
    project.developer = faker.company.companyName()
    project.status = faker.random.number({ min: 0, max: 1 })
    project.network = faker.commerce.productName()
    project.link = faker.internet.url()
    project.tagline = faker.lorem.sentence(20, 10)
    project.featured = faker.random.boolean()
    project.githubRepo = faker.random.word()

    return project
})
