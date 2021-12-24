# Discord TS Economy

```
 * ! ----------------------------- Lewd Labs ---------------------------------
 *  Thanks for checking our this package! Please read the information below...
 * ? ------------------------ Discord TS Economy ---------------------------
```

![GitHub issues](https://img.shields.io/github/issues/lewd-labs/discord-easy-economy?style=for-the-badge) ![GitHub pull requests](https://img.shields.io/github/issues-pr/lewd-labs/discord-easy-economy?style=for-the-badge) ![GitHub Repo stars](https://img.shields.io/github/stars/lewd-labs/discord-easy-economy?style=for-the-badge) ![npm](https://img.shields.io/npm/v/discord-easy-economy?style=for-the-badge)

⚠️ The package is still in beta-development and not ready for production. Please leave a star and join our discord for more updates!

## Highlights

- `🍃` Power by MongoDB.
- `🌀` Build with typescript.
- `⚡` Caching for quick load times.
- `🤖` Made for Discord.js first.

### Example

```typescript
import { Economy } from "discord-ts-economy";

const eco = new Economy({
  // configuration options...
});

// a built in function to connect to mongodb
eco.connect("mongodb connection string");

// adds a value of 100 through 500 to a users wallet with a 10 percent fail chance.
eco.currencyHandler.work("some_user_id", 100, 500, 10);
```

_For a more complex example please read our [detailed guide](https://lewd-labs.github.io/xyz/)_

## Installation

Use one of the commands listed below to install.

```
yarn add discord-ts-economy
```
or 
```
npm install discord-ts-economy
```

_Mongodb will be installed as well as the package dependency._

## Built with

- [Nodejs](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Love](https://www.youtube.com/channel/UCVOQobByo_2WISQf2037eXQ)

## Contributing

Please read [CONTRIBUTING.md](./.github/assets/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Helpful links

- [Documentation](https://lewd-labs.github.io/Economy/)

- [YouTube](https://www.youtube.com/channel/UCVOQobByo_2WISQf2037eXQ)

- [Discord](https://discord.com/invite/N79DZsm3m2)

- [Guide](https://lewd-labs.github.io/xyz/)
