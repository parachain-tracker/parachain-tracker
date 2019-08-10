import { Test, TestingModule } from "@nestjs/testing"
import { DynamicCronService } from "./dynamic_cron.service"

describe("DynamicCronService", () => {
    let service: DynamicCronService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DynamicCronService],
        }).compile()

        service = module.get<DynamicCronService>(DynamicCronService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })
})
