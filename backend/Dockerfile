FROM oven/bun

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

CMD bun dev

EXPOSE ${PORT}
