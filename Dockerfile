FROM node:20.14.0-alpine3.20

RUN npm install -g pnpm

WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]