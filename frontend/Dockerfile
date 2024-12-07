FROM oven/bun:1.1.38 AS base

WORKDIR /app

# ---
FROM base AS builder

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile \
    && bun next telemetry disable

COPY . .
RUN bun run build
RUN bun install --production --frozen-lockfile

# ---
FROM base AS final

EXPOSE 3000
CMD ["bun", "run", "start"]
