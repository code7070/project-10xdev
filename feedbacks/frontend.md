Hello mas Jojo!
Here is my feedback on frontend.

## Context

I would suggest you to create custom hooks for auth.

```ts
import { useContext } from "react";
import { AuthContext } from "@/services/useAuth";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return {
    isLogin: !!auth.data?.id,
    name: auth.data?.name || "",
  };
};

// Usage
const { isLogin, name } = useAuth();
```

## Motion Div

Since it's a common component, I would suggest you to create a custom component for it.

```tsx
import { motion, Variants } from "framer-motion";

const vars: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const MotionDiv: React.FC = ({ children }) => <motion.div variants={vars}>{children}</motion.div>;

export default MotionDiv;
```

### Usage

```tsx
"use client";

import DashboardGreeting from "@/components/dashboard/greeting";
import DashboardProjects from "@/components/dashboard/projects";
import DashboardSearch from "@/components/dashboard/search";
import DashboardTaskAction from "@/components/dashboard/task-action";
import DashboardTaskProgress from "@/components/dashboard/task-progress";
import DashboardTasks from "@/components/dashboard/tasks";
import DashboardUpcoming from "@/components/dashboard/upcoming";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import MotionDiv from "@/components/MotionDiv";

export default function Home() {
  const { isLogin, name } = useAuth();

  return (
    <div className="flex flex-col gap-6 w-full pb-20">
      <DashboardGreeting name={name} />
      <DashboardSearch />
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { delayChildren: 0.1, staggerChildren: 0.2 },
          },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="page-wrapper"
      >
        <section className="grid grid-cols-[2fr_1fr_1fr] gap-4">
          <MotionDiv>
            <DashboardUpcoming />
          </MotionDiv>
          <MotionDiv>
            <DashboardProjects isLogin={isLogin} />
          </MotionDiv>
          <MotionDiv>
            <DashboardTasks isLogin={isLogin} />
          </MotionDiv>
        </section>
        <section className="grid grid-cols-2 gap-4">
          <MotionDiv>
            <DashboardTaskAction />
          </MotionDiv>
          <MotionDiv>
            <DashboardTaskProgress isLogin={isLogin} />
          </MotionDiv>
        </section>
      </motion.div>
    </div>
  );
}
```

## Fetching Data

I have telling on the class, when you fetch data, you should use Server Components instead of Client Side (useSWR). Because it's faster, if you are not use it, you lose the benefits of Nextjs.

You might still get influenced by the old way of React, but I would suggest you to try it out. :)

You also should use server action instead of client submission.
The server action is the best way to handle form submission without client. And it works even without JavaScript.

## Fetcher Function

I would suggest you to standardize the fetcher payload. It's easier to maintain and read.

```ts
private async request(
    method: string,
    endpoint: string,
    body?: RequestBody,
    isFormData: boolean = false
  ): Promise<any> {
    let bodyPayload: string | FormData | undefined;

    if (body) {
      if (isFormData) {
        const formData = new FormData();
        Object.keys(body).forEach((key) => formData.append(key, body[key] as string | Blob));
        bodyPayload = formData;
      } else {
        bodyPayload = JSON.stringify(body);
      }
    }

    try {
      const response = await fetch(this.apiEndpoint(endpoint), {
        method,
        headers: this.headers,
        body: bodyPayload,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error in ${method} request to ${endpoint}:`, error);
      throw error;
    }
  }

    async POST(endpoint: string, body?: RequestBody, isFormData: boolean = false): Promise<any> {
        return this.request("POST", endpoint, body, isFormData);
    }

    async GET(endpoint: string, params?: RequestBody): Promise<any> {
        const queryString = params
        ? "?" + new URLSearchParams(params as Record<string, string>).toString()
        : "";
        return this.request("GET", `${endpoint}${queryString}`);
    }

    async DELETE(endpoint: string, body?: RequestBody, isFormData: boolean = false): Promise<any> {
        return this.request("DELETE", endpoint, body, isFormData);
    }
```

Even though i am not a big fans of it. It would easier to read and maintain.
