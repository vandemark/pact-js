"use strict"

const getMeDogs = require("../index").getMeDogs

describe("Dog's API", () => {
  let url = "http://localhost"

  const EXPECTED_BODY = [
    {
      dog: 1,
    },
  ]

  afterEach(() => {
    return provider.verify()
  })

  // no OPTIONS preflight request but has withCreds
  describe("works", () => {
    beforeEach(() => {
      const interaction = {
        state: "i have a list of projects",
        uponReceiving: "a request for projects",
        withRequest: {
          method: "GET",
          path: "/dogs",
          headers: {
            Accept: "application/json"          
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: EXPECTED_BODY,
        },
      }
      return provider.addInteraction(interaction)
    })

    let headers = { Accept: "application/json" }
    // add expectations
    it("returns a sucessful body", () => {
      return getMeDogs({
        url,
        port,
        headers
      }).then(response => {
        expect(response.headers["content-type"]).toEqual("application/json")
        expect(response.data).toEqual(EXPECTED_BODY)
        expect(response.status).toEqual(200)
      })
    })
  })

  // has OPTIONS preflight request (caused by custom header) & has withCreds
  describe("works again", () => {
    beforeEach(() => {
      const interaction = {
        state: "i have a list of projects again",
        uponReceiving: "a request for projects again",
        withRequest: {
          method: "GET",
          path: "/dogs",
          headers: {
            Accept: "application/json",
            custom: "5"
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: EXPECTED_BODY,
        },
      }
      return provider.addInteraction(interaction)
    })

    let headers = { Accept: "application/json", custom: "5" }
    // add expectations
    it("returns a sucessful body", () => {
      return getMeDogs({
        url,
        port,
        headers
      }).then(response => {
        expect(response.headers["content-type"]).toEqual("application/json")
        expect(response.data).toEqual(EXPECTED_BODY)
        expect(response.status).toEqual(200)
      })
    })
  })
})
