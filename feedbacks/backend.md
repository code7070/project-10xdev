Hello mas Jojo!
Good work!
I do really appreciate your effort to make this project!

So, i have some feedback for you:

Let's start with the backend side:

## Cors Settings

I do suggest you to use the environment variable for the list of allowed origins in the cors settings. It would make it easier to manage the allowed origins.

```ts
export const corsConfig = cors({
  origin: ["http://localhost:3000", "http://103.127.139.85:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});
```

Example:

```ts
export const corsConfig = cors({
  origin: process.env.ALLOWED_ORIGINS.split(","),
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});
```

## Environment Variables

I would suggest you to use library for parsing the environment variables. It would make it easier to manage the environment variables. There is couple of libraries that you can use, like `envalid`. [envalid](https://www.npmjs.com/package/envalid)

It would make your code cleaner and safer.

## Nullish Coalescing Operator

I see that you use the `||` operator for the default value. I would suggest you to use the nullish coalescing operator `??` instead of `||`. It would make your code safer. Because the `||` operator will return the right side value if the left side value is falsy. But the `??` operator will return the right side value only if the left side value is `null` or `undefined`.

```ts
const headers_apiId = headers?.["api-id"] || "";
const headers_apiKey = headers?.["api-key"] || "";
```

Example:

```ts
const headers_apiId = headers?.["api-id"] ?? "";
const headers_apiKey = headers?.["api-key"] ?? "";
```

## AI Services

This is a good practice, however since you are calling the ENV directly.
I would suggest you to handle the error if the ENV is not set. It would make your code safer.

```ts
export class AIService {
  private apiKey = process.env.OPENAI_API_KEY;
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: this.apiKey });
  }
}
```

Example:

```ts
class AIService {
  private apiKey: string;
  private openai: OpenAI;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || "";
    if (!this.apiKey) {
      throw new Error("OPENAI_API_KEY is not set");
    }
    this.openai = new OpenAI({ apiKey: this.apiKey });
  }
}
```

## generateProjectDescription

I would suggest you to extract any constant for AI Prompt to another file. It would make your code cleaner and easier to manage. Like SYSTEM_CONTENT and USER PROMPT.

## Clean up the code

You can clean up the code by removing the unused code. It would make your code cleaner and easier to read.

## Types

I am not sure is it intended or not. Make all the properties in the interface optional is not a good practice. I would suggest you to make the properties required if it is required. If you need to make all properties optional, you can use the Partial type. It might because the nature of Supabase response ?

```ts
export interface User {
  id?: number;
  name?: string;
  photo?: string;
  token?: string;
  token_expires?: Date | string;
  last_login?: Date | string;
}

// Better
export interface User {
  id: number;
  name: string;
  photo: string;
  token: string;
  token_expires: Date | string;
  last_login: Date | string;
}

export type PartialUser = Partial<User>;
```

## Employee Repo

I believe you need to have safe fallback for the results. It would make your code safer and also for error prevention.

```ts
const payload: Employee[] =
  users.results?.map((i) => ({
    id: i.login.uuid,
    name: `${i.name.first} ${i.name.last}`,
    email: i.email,
    photo: i.picture.large,
  })) || [];
```

## Routes

I would suggest you follow the RESTful API standard. For example

```ts
// Bad
GET /employee/add?amount=1
GET /employee?id=1
POST /project/delete/1
POST /update/:taskId

// Good
POST /employee
GET /employee/1
GET /employee // (get all employees)
DELETE /project/1
PUT /task/:taskId
PATCH /task/:taskId
```

Any action api should be a POST method. Its a good practice to follow the RESTful API standard.

## Cookie error handling

I would suggest you to handle the error if the cookie is not set. It would make your code safer.

```ts
async ({ body, cookie: { "pms-token": token } }) => {
    return await projectService.create(body, token.value!);
},
```

The mindset should be "Always assume the worst". :)

## Test Case

I would suggest you to not do this :

```ts
.get("/test", () => "ok")
```

You can just call directly the `/routes` instead of creating a new route for testing. You can check the response directly from the route, let say the status code === 200.

## Logger

I would suggest you to use the logger library for logging. It would good for capturing any error log for easier debug. There is couple of libraries that you can use, like `winston`. [winston](https://www.npmjs.com/package/winston)

## CI/CD

I would suggest you to use the CI/CD for the deployment. It would make your deployment process easier and safer. You can use the Github Actions just like in the class.
