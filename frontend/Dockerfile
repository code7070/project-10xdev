FROM oven/bun:1.1.38 AS base

WORKDIR /app

# ---
FROM base AS builder

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile \
    && bun next telemetry disable

COPY . . 

RUN bun install --production --frozen-lockfile

RUN bun run build



# ---
FROM base AS final

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --chown=nextjs:nextjs . .
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nextjs /app/node_modules ./node_modules/

RUN chown nextjs:bun .

USER nextjs

EXPOSE 3000
CMD ["bun", "server.js"]