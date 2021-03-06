import { define } from "typeorm-seeding"
import * as Faker from "faker"
import { ExternalLinkEntity } from "@parachain-tracker/models"

define(ExternalLinkEntity, (faker: typeof Faker, settings: { name: string }) => {
    const externalLink = new ExternalLinkEntity()

    externalLink.name = settings.name
    externalLink.url = faker.internet.url()

    return externalLink
})
