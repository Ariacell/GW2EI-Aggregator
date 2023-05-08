# Aggregate WvW fight logs

This tool is intended for use by WVW groups to evaluate their performance in small scale/GvG engagements. To a lesser extent it could be useful for large scale fights, or PvE aggregate logs, although this is not directly supported and may have errors due to phasing of PvE bosses that does not occur in WvW.
![image](https://user-images.githubusercontent.com/49768670/236710649-6d2a2860-c3d2-45c9-9999-8f7f7151fd61.png)


# Usage guide

1. Download the latest release for your target platform.
2. Parse a collection of logs you would like to aggregate using the excellent [GW2-EI parser](https://github.com/baaron4/GW2-Elite-Insights-Parser), making sure to select JSON as one of your output formats, and detailed WvW parsing.
3. Create a zip file from the JSON logs. Run the executable and navigate to [localhost:5000](http://localhost:5000) in your preferred browser
4. Drag and drop or upload your zip file in the provided window, and click "Generate Aggregated Report"
5. If everything goes well, you should be able to view a table with some of the most useful stats for WvW combat review.

## Disclaimer

Thrown together in 5-6 nights over a couple months, this is a hacky project with a simple front-end sample consumer showing what a log aggregator for gw2 logs _could_ look like. See the roadmap and unsupported features sections for further details on the evolution of this project. This software is provided as is, with no guarantees or dedicated support. I intend to iterate on this on a best effort basis, but it is primarily a playground for experimenting with ideas outside of my day to day consulting work. Some solutions or implementations will be intentionally sub optimal as they might be a vehicle for playing with new tools or patterns.

## Contributing guide

You will need a NodeJS compatible development environment with the ability to run yarn, and NVM or some other node version manager is strongly recommended. See here for instructions to install yarn on windows: <https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable>, although WSL is often nicer nowadays.

### Setup

```bash
git clone [reponame]
cd [reponame]
yarn install
```

### Development

For most simple use cases, simply have the prerequisites and setup complete, and then run `yarn start:dev` from the root of the repo. Then navigate to `localhost:5000` and upload json files. Note boon table is very much a work in progress.

### Running locally:

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
- [x] Table but toggleable displays

### Target MVP stats:

- [x] time active
- [x] fights participated in out of total
- [x] average distance to commander
- [x] boonrip
- [x] condis cleansed
- [x] boon gen group
- [ ] non same server players in squad added to data
- [ ] boon gen squad
- [ ] dmg taken
- [x] dmg dealt
- [x] dps out
- [x] dps in
- [x] buffs uptime
- [x] distance from pin
- [x] target damage (damage done to the player agent's target, array of sequential targets over course of round)

### Infrastructure and serving

- [ ] Standalone executable -> **This is the current priority, and somewhat accomplished**
- [ ] Deployed and available over http in ECS -> This was accomplished but put on hold due to difficulties with memory leaking in ECS
- [ ] Find a nicer way to upload and parse, upload zetc files and parse on server seems easiest.
- [ ] HTTPS + certificate
- [ ] Automated deployments

### Out of scope for now:

- Subgroup parsing, lots of messiness
- HTML parsing

### Spreadsheet

- [x] Time
- [x] DPS
- [x] Damage Taken
- [x] Damage Taken / TIme
- [x] Deaths
- [x] Deaths / Minute
- [x] Downs
- [x] Downs / Minute
- [x] Interrupts on enemy
- [x] Interrupts on enemy / Minute
- [x] Cleanse Others
- [x] Cleanse / Minute
- [x] Boonrip
- [x] Boonrip / Minute
- [x] Downed Targets / Contribution
- [x] Avg Distance Center Group
- [x] Avg Distance Tag
- [ ] Attacks Blocked (offensive)
