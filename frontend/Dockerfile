FROM oven/bun AS base

WORKDIR /app

COPY ./package.json ./bun.lockb ./

RUN bun install

COPY . .
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["bun", "run", "build"]


FROM base AS builder

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


ENV PORT 3001
ENV HOSTNAME localhost

EXPOSE 3000


# CMD ["bun", "run", "start"]
CMD ["node", "server.js"]
