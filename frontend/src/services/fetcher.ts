export class FetchService {
  private isServer = typeof window === "undefined";

  private headers: HeadersInit;

  constructor() {
    const apiId = this.isServer
      ? process.env.API_ID!
      : process.env.NEXT_PUBLIC_API_ID!;
    const apiKey = this.isServer
      ? process.env.API_KEY!
      : process.env.NEXT_PUBLIC_API_KEY!;

    this.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "API-ID": apiId,
      "API-KEY": apiKey,
    };
  }

  apiEndpoint(endpoint: string) {
    return `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
  }

  async POST(
    endpoint: string,
    body?: { [key: string]: string | Blob },
    isFormData: boolean = false,
  ) {
    // payload declare
    let bodyPayload: string | FormData = JSON.stringify(body);

    // payload rewrite
    if (isFormData && body && Object.keys(body).length > 0) {
      const formdata = new FormData();
      Object.keys(body).map((i) => formdata.append(i, body[i]));
      bodyPayload = formdata;
    }

    return await (
      await fetch(this.apiEndpoint(endpoint), {
        body: bodyPayload,
        method: "POST",
        headers: this.headers,
        credentials: "include",
      })
    ).json();
  }

  async GET(
    endpoint: string,
    body?: { [key: string]: number | string | Date | boolean },
  ) {
    // body to query parameters
    let queryString = "";
    if (body && Object.keys(body).length > 0) {
      queryString = Object.keys(body)
        .map((i) => `${i}=${body[i]}`)
        .join("&");
    }

    return await (
      await fetch(this.apiEndpoint(`${endpoint}?${queryString}`), {
        headers: this.headers,
        credentials: "include",
      })
    ).json();
  }

  async DELETE(
    endpoint: string,
    body?: { [key: string]: string | Blob },
    isFormData: boolean = false,
  ) {
    // payload declare
    let bodyPayload: string | FormData = JSON.stringify(body);

    // payload rewrite
    if (isFormData && body && Object.keys(body).length > 0) {
      const formdata = new FormData();
      Object.keys(body).map((i) => formdata.append(i, body[i]));
      bodyPayload = formdata;
    }

    return await (
      await fetch(this.apiEndpoint(endpoint), {
        body: bodyPayload,
        method: "DELETE",
        headers: this.headers,
        credentials: "include",
      })
    ).json();
  }
}
