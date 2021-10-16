const meetup = require("./meetup")
// @ponicode
describe("meetup.default", () => {
    test("0", async () => {
        await meetup.default()
    })
})
