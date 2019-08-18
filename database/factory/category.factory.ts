import { define } from "typeorm-seeding"
import * as Faker from "faker"
import { CategoryEntity } from "@parachain-tracker/models"

define(CategoryEntity, (faker: typeof Faker) => {
    const category = new CategoryEntity()

    category.name = faker.commerce.productAdjective()

    return category
})
