## Global Environment

-   Node: 10.15.3
-   Angular CLI: 8.2.0
-   Commitizen: 4.0.3 (optional)

## Setup

Clone this repository:

```bash
git clone https://github.com/parachain-tracker/parachain-tracker.git
cd parachain-tracker
```

For development check out the develop branch

```bash
git checkout develop
```

Install dependencies

```bash
npm install
```

## Database

Run the following script to set up the database for development

```bash
npm run db:init
```

During development, synchronise the db whenever you change an entity

```bash
npm run db:schema:sync
```

Before committing changes to an entity, generate a migration

```bash
npm run db:migration:generate
```

When pulling code, check to see if there's any changes to the schema

```bash
npm run db:schema:log
```

When ready, migrate to the latest schema

```bash
npm run db:migration:run
```

Revert a bad migration

```bash
npm run db:migration:revert
```

## Development server

Run `ng serve` for the Client dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

Run `ng serve api` for the API dev server. This will spin up at http://localhost:3333/api. The app will automatically reload if you change any of the source files.

## Code scaffolding

These can be run on the terminal or a supported IDE (such as IntelliJ)

### Libraries

Run `ng g lib` to generate a library.

Libraries are sharable across libraries and applications. They can be imported from `@parachain-tracker/mylib`.

### Client

Client side generators are provided by Angular. Refer to the [Angular documentation](https://angular.io/cli/generate) for more generators.

Run `ng g module` to generate a module.

Run `ng g component` to generate a component.

Run `ng g directive` to generate a directive.

Run `ng g service` to generate an injectable service.

Or run `ng g --help` for more options

### Server

Server side generators are provided by NestJS. Refer to the docs for [available generators](https://docs.nestjs.com/cli/usages).

Run `ng g @nrwl/nest:module --project=api` to generate a module.

Run `ng g @nrwl/nest:controller --project=api` to generate an API controller.

Run `ng g @nrwl/nest:service --project=api` to generate an injectable service.

## Build

Run `npm run build` to build the whole project. The build artifacts will be stored in the `dist/` directory.

For debugging builds, run `ng build` for the Client and `ng build api` for the API.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Angular Documentation](https://angular.io/docs) to learn more about the Client stack.
Visit the [NestJS Documentation](https://docs.nestjs.com/) to learn more about the API stack.
Visit the [Nx Documentation](https://nx.dev/angular) to learn more about the project structure.
