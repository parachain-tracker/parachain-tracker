import { Test, TestingModule } from "@nestjs/testing"
import { DappsController } from "./dapps.controller"

describe("Dapps Controller", () => {
    let controller: DappsController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DappsController],
        }).compile()

        controller = module.get<DappsController>(DappsController)
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })
})
