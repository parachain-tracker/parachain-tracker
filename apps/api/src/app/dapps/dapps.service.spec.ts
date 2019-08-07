import { Test, TestingModule } from "@nestjs/testing"
import { DappsService } from "./dapps.service"

describe("DappsService", () => {
    let service: DappsService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DappsService],
        }).compile()

        service = module.get<DappsService>(DappsService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })
})
