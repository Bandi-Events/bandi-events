<p align="center">
  <img src="https://avatars.githubusercontent.com/u/89709223?s=200&v=4" width="100px" alt="bandi">
</p>
<h1 align="center">
	Bandi Events
	<a href="https://www.npmjs.org/package/bandi-events"><img src="https://img.shields.io/npm/v/bandi-events.svg?style=flat" alt="npm"></a> 
  <a href="https://github.com/Bandi-Events/bandi-events/actions/workflows/tests.yml"><img src="https://github.com/Bandi-Events/bandi-events/actions/workflows/tests.yml/badge.svg" alt="github workflow"></a>
</h1>

## Overview

> This library is part of the [Bandi](https://github.com/Bandi-Events) group of projects. These are meant to encourage and incentivize users to enter into the [Web Monetization](https://webmonetization.org/) ecosystem. These projects provide a set of tools to help easily bootstrap a rewards framework for a website or application.

Bandi-Events sets up listeners to monitor [transaction events](https://webmonetization.org/docs/api/#monetizationprogress). You can set a custom multiplier to reward users with points based on their contributions. Take the following example:

- User has 0 points
- Creator has set a multiplier of 100x
- User streams 0.01 to creator
- Bandi-Events captures transaction event and uses multiplier to determine points accrued: `0.01 * 100 = 1 point`
- User balance is updated to 1 and the new balance is returned through callback

Bandi will always be unopinionated about how you use & manage points, and will stay decoupled from any specific systems implementation. It's simply a set of tools intended to help creators bootstrap a rewards system for their applications.

## Requirements

Check out the official Web Monetization [Quick Start Guide](https://webmonetization.org/docs/getting-started) to learn how to set up a wallet for receiving payments. This library assumes you have a meta tag to set up monetization with the payment pointer to your wallet. Example:

```js
<meta
  name="monetization"
  content="$wallet.example.com/alice"
>
```

## Installation

```js
npm install bandi-events --save

or

yarn add bandi-events
```

## Example

```js
const events = new BandiEvents();

events.init({
  currentBalance: 0,
  multiplier: 1000,
  onTransaction: (tx) => console.log(tx),
});
```

## Parameters

| Name           | Type     | Required | Description                                                                  |
| -------------- | -------- | -------- | ---------------------------------------------------------------------------- |
| currentBalance | number   | yes      | The current point balance for a user.                                        |
| multiplier     | number   | yes      | A multiplier for adjusting how many points each transaction will convert to. |
| onTransaction  | function | no       | An optional callback function that triggers on each transaction.             |

## API

| Name              | Returns | Description                                                                  |
| ----------------- | ------- | ---------------------------------------------------------------------------- |
| init              | void    | Initialize a new BandiEvents instance.                                       |
| getCurrentBalance | number  | Returns the user's current point balance.                                    |
| startMonetization | void    | Starts the monetization event listener (called automatically with `init`).   |
| stopMonetization  | void    | Stops the monetization event listener (called automatically with `cleanup`). |
| isActive          | boolean | Returns whether a BandiEvents instance has been initialized.                 |

## Contributing

If you've noticed a bug or have a feature you'd like to suggest, feel free to open a [GitHub Issue](https://github.com/Bandi-Events/bandi-events/issues). If you would like to contribute to the project, feel free to fork this repo, create a new branch & open a pull request.

## Licence

MIT © [brewsterbhg](https://github.com/brewsterbhg)
