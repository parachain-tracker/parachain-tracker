import { Test, TestingModule } from "@nestjs/testing"
import { FeaturedController } from "./featured.controller"

describe("Featured Controller", () => {
    let controller: FeaturedController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FeaturedController],
        }).compile()

        controller = module.get<FeaturedController>(FeaturedController)
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })
})
