import { getGreeting } from "../support/app.po"

describe("parachain-tracker", () => {
    beforeEach(() => cy.visit("/"))

    it("should display welcome message", () => {
        getGreeting().contains("Welcome to parachain-tracker!")
    })
})
