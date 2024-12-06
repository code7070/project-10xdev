FROM oven/bun AS base

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY . .
RUN bun run build

# CMD bun run dev
CMD ["bun", "dev"]

EXPOSE 3000