# Nest Demo

Demostration project to show how to use [NestJS](https://github.com/nestjs/nest) with TypeScript

## Installation

```bash
$ pnpm install
```

## Dockerize your database 🐳

You should see a file named `docker-compose.yaml` at the `/` directory.

There you will find all the details to connect to the PostgreSQL database this project was setup for.

In order to start it up, run the following command from the `/` directory:

```bash
docker compose up -d
```

This should setup and start up two databases, one for to try things out and another for used for the Integration tests.

## Running the app locally 👨🏻‍💻

```bash
# development
$ pnpm start

# watch mode
$ pnpm dev

# production mode
$ pnpm prod
```

## Running the Integration Tests 🧪

After you have spin up the test database using Docker, execute the following command:

```bash
pnpm test
```
And after a few seconds you should see the results in your Terminal.