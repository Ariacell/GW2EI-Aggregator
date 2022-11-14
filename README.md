# Aggregate WvW fight logs

Thrown together in 3-4 nights, this is a hacky project with a simple front-end sample consumer showing what a log aggregator for gw2 logs *could* look like. Some bugs at the moment with the boon averaging.

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

- Intended solution: provide an api for generating summaries of logs with totals/averages. Use the information from this API to generate a pretty report.

### Target MVP display:

- [x] Table
- [x] Table with sortable columns
- [ ] Table but toggleable displays

### Target MVP stats:

- [x] time active
- [x] fights participated in out of total
- [x] average distance to commander
- [ ] boonrip
- [x] condis cleansed
- [x] boon gen group
- [ ] non same server players in squad added to data
- [ ] boon gen squad
- [ ] dmg taken
- [x] dmg dealt
- [x] dps out
- [ ] dps in
- [ ] buffs
- [x] distance from pin
- [x] target damage (damage done to the player agent's target, array of sequential targets over course of round)

### Out of scope for now:

- Subgroup parsing, lots of messiness
