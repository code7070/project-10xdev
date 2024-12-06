FROM oven/bun AS base

WORKDIR /app

COPY ./package.json ./bun.lockb ./

RUN bun install

FROM base AS builder

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ENV NEXT_TELEMETRY_DISABLED 1

ENV PORT 3001
ENV HOSTNAME localhost

EXPOSE 3000


# CMD ["bun", "run", "start"]
CMD ["node", "server.js"]
