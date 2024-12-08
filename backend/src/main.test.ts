import { describe, it, expect } from "bun:test";
import { treaty } from "@elysiajs/eden";
import { apiApp } from ".";

const api = treaty(apiApp);

describe("Elysia", () => {
  it("return a response from /test", async () => {
    const { data } = await api.test.get();
    expect(data).toBe("ok");
  });
});

describe("Get 5 Employee", () => {
  it("Retrieve employee list from randomuser.me", async () => {
    //
    const { data } = await api["random-user"].index.get({
      query: { amount: 5 },
      headers: {
        "api-id": process.env.API_ID,
        "api-key": process.env.API_KEY,
      },
    });

    expect(data).toHaveProperty("results");
    expect(Array.isArray(data?.results)).toBe(true);
    expect(data?.results.length).toBe(5);
    // expect(Array.isArray(data?.results)).toBe(true);
  });
});
