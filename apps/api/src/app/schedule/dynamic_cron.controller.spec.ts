import { Test, TestingModule } from "@nestjs/testing"
import { DynamicCronController } from "./dynamic_cron.controller"

describe("DynamicCronController", () => {
    let controller: DynamicCronController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DynamicCronController],
        }).compile()

        controller = module.get<DynamicCronController>(DynamicCronController)
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })
})
