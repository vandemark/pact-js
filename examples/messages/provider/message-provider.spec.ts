/* tslint:disable:no-unused-expression object-literal-sort-keys max-classes-per-file no-empty no-console*/
const { MessageProviderPact } = require("../../../src/pact")
import path = require("path")
const { getMsg } = require("./msg-client")

describe("Message provider tests", () => {
  const p = new MessageProviderPact({
    messageProviders: {
      "a request for rendering": () => getMsg(),
    },
    log: path.resolve(process.cwd(), "logs"),
    logLevel: "fatal",
    provider: "MyJSMessageProvider",
    providerVersion: "1.0.0",

    // For local validation
    pactUrls: [
      path.resolve(
        process.cwd(),
        "myjsmessageconsumer-myjsmessageprovider.json"
      ),
    ],
  })

  describe("send a render message", () => {
    it("sends a valid render message", () => p.verify())
  })
})
