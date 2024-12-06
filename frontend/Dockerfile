FROM oven/bun AS base

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY . .
RUN bun run build

# CMD bun run dev

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME localhost

CMD ["node", "server.js"]