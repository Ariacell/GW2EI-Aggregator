# Template repo for Node APIs with ts-jest support

## Setup

```bash
git clone [reponame]
cd [reponame]
yarn install
```

## Running locally:

```bash
cp sample.env .env
```

To run with hot reload, use:

```bash
yarn start:dev
```

To start in production mode, use:

```bash
yarn start
```

Test with

```bash
yarn test
```

## Roadmap

Possible implementations:

-   Intended solution: provide an api for generating summaries of logs with totals/averages. Use the information from this API to generate a pretty report.

-   Target MVP stats: boonrip, condis cleansed, dmg taken, dmg dealt, distance from pin
