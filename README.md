# Banner Server

Node backend running TypeScript and Express.js for the Banner App.

## Quick Start

    $ yarn install

Update the `.env` with the appropriate environment variables

Start the backend server in (DEV)

    $ docker-compose up

Go to `localhost:3000/graphql` to view API

Use Drizzle Studio to browser the Postgres DB

    $ yarn run drizzle:studio

or

    $ yarn drizzle-kit studio --port 3000 --verbose

## Migrations

Create a new migration first. A new migration sql file will show up in `./drizzle/migration`

    $ yarn run drizzle:migration:generate

Then deploy the migration to the database using the following command:

    $ yarn run drizzle:migration:deploy

IF you just want to push your schema directly to the database **without** creating a migration you can use the following command:

    $ yarn run drizzle:migration:push

## Deployment

[Railway](https://railway.app/) is currently used to run the application in a non-dev environment.

Railway is connected to the `main` branch of the a Github repo and will automatically deploy follow a successful pull request.

You can get to the GraphQL API page here:
[https://banner.up.railway.app/graphql](https://banner.up.railway.app/graphql)

## Notable Packages/Libraries

- [Node](https://nodejs.org/en) - version 18 in Dockerfile
- [Typescript](https://www.typescriptlang.org/) - we write readable, debugable code in these here parts...
- [Express.js](https://expressjs.com/) - lightweight web server
- [GraphQL](https://graphql.org/) - Core API methodology
- [TypeGraphQL](https://typegraphql.com/) - Enables the ability to develop GraphQL types, queries, and mutations using TypeScript classes
- [Apollo](https://www.apollographql.com/) - GraphQL server simplifying GraphQL development and enabling scalability and ingrations
- [Drizzle](https://orm.drizzle.team/) - flexible ORM for Typescript
- [h3](https://h3geo.org/) - geospatial indexing system based on hexagons that is hierarchical and optimizes for functions like: nearest neighbors, shortest path, gradient smoothing, etc.

## Data Storage

- Postgres
- Redis

## Containerization

- Docker
- Docker Compose (DEV)
