# Aggregate WvW fight logs

Thrown together in 3-4 nights, this is a hacky project with a simple front-end sample consumer showing what a log aggregator for gw2 logs _could_ look like. Some bugs at the moment with the boon averaging.

## Prerequisites

Ability to run yarn. See here for instructions to install yarn on windows: <https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable>

## Setup

```bash
git clone [reponame]
cd [reponame]
yarn install
```

## READ ME FIRST!

For most simple use cases, simply have the prerequisites and setup complete, and then run `yarn start:dev` from the root of the repo. Then navigate to `localhost:5000` and upload json files. Note boon table is very much a work in progress.

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

### Infrastructure and serving

- [x] Deployed and available over http in ECS -- uploading JSON suuuucks
- [ ] Find a nicer way to upload and parse, upload zetc files and parse on server seems easiest.
- [ ] HTTPS + certificate
- [ ] Automated deployments
- [ ] Standalone executable

### Out of scope for now:

- Subgroup parsing, lots of messiness

### Spreadsheet

- [x] Time
- [x] DPS
- [x] Damage Taken
- [x] Damage Taken / TIme
- [x] Deaths
- [x] Deaths / Minute
- [x] Downs
- [x] Downs / Minute
- [ ] Interrupts on enemy
- [ ] Interrupts on enemy / Minute
- [x] Cleanse Others
- [x] Cleanse / Minute
- [ ] Boonrip
- [ ] Boonrip / Minute
- [ ] Downed Targets
- [x] Avg Distance Center Group
- [x] Avg Distance Tag
- [ ] Attacks Blocked (offensive)
