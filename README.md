# Discord TS Economy

```
 * ! ----------------------------- Lewd Labs ---------------------------------
 *  Thanks for checking our this package! Please read the information below...
 * ? ------------------------ Discord TS Economy ---------------------------
```

![GitHub issues](https://img.shields.io/github/issues/lewd-labs/discord-easy-economy?style=for-the-badge) ![GitHub pull requests](https://img.shields.io/github/issues-pr/lewd-labs/discord-easy-economy?style=for-the-badge) ![GitHub Repo stars](https://img.shields.io/github/stars/lewd-labs/discord-easy-economy?style=for-the-badge) ![npm](https://img.shields.io/npm/v/discord-ts-economy?style=for-the-badge) ![npm](https://img.shields.io/npm/dw/discord-ts-economy?style=for-the-badge)

⚠️ The package is still in beta-development and not ready for production. Please leave a star and join our discord for more updates!

## Highlights

- `🍃` Power by MongoDB.
- `🌀` Build with typescript.
- `⚡` Caching for quick load times.
- `🤖` Made for Discord.js first.

## Installation

> Version 16.6.0 or newer of Node.js is required

```
yarn add discord-ts-economy
npm install discord-ts-economy
pnpm add discord-ts-economy
```

### Basic Demo

```typescript
import { Economy, CurrencyHandler } from "discord-ts-economy";

const eco = new Economy();

// connect our database
eco.connect("mongodb connection string");

const currencyHandler = new CurrencyHandler();

// Fetches all the documents from our database (if the exist) and saves them to our cache.
currencyHandler.init();

// adds a value of 100 through 500 to a users wallet with a 10 percent fail chance.
currencyHandler.work("some_user_id", 100, 500, 10);
```

Click the image below for a video style introduction.
[![Demo Video Screenshot Link](https://cdn.discordapp.com/attachments/919435340463366236/932835016076038144/support.png)
](https://www.youtube.com/watch?v=xGt90N3mUtg&t=1276s)

## Built with

- [Nodejs](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Love](https://www.youtube.com/channel/UCVOQobByo_2WISQf2037eXQ)

## Contributing

Please read [CONTRIBUTING.md](./.github/assets/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Helpful links

- [Documentation](https://lewd-labs.github.io/discord-ts-economy/)

- [YouTube](https://www.youtube.com/channel/UCVOQobByo_2WISQf2037eXQ)

- [Discord](https://discord.com/invite/N79DZsm3m2)

- [Guide](https://lewd-labs.github.io/guide/)

- [Change Logs](https://github.com/lewd-labs/discord-ts-economy/releases)
