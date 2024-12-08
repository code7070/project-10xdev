import { describe, it, expect } from "bun:test";
import { apiApp } from ".";

const api = apiApp;

describe("Elysia Test", () => {
  it("return a response from /test", async () => {
    const response = await api.handle(new Request("http://localhost/test"));
    const text = await response.text();

    expect(response.status).toBe(200);
    expect(text).toBe("ok");
  });
});

describe("Get 3 Employee", () => {
  it("Retrieve employee list from randomuser.me", async () => {
    //
    const response = await api.handle(
      new Request("http://localhost/random-user?amount=3", {
        headers: {
          "api-id": process.env.API_ID!,
          "api-key": process.env.API_KEY!,
        },
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty("results");
    // expect(Array.isArray(data?.results)).toBe(true);
    // expect(data?.results.length).toBe(5);
  });
});
