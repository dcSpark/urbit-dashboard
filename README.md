<h1 align="center">
  Urbit Dashboard
</h1>
<p align="center">Urbit Dashboard is an Urbit Web App which allows users to easily view key stats and have administrative control over their Urbit ship straight from the web browser. An an Urbit Web App, Urbit Dashboard relies on <a href = "https://github.com/dcSpark/urbit-visor">Urbit Visor</a> to interact with your Urbit ship and the rest of the network itself.</p>

<p align="center"><img src="https://img.shields.io/badge/license-mit-blue?style=for-the-badge&logo=none" alt="license" /></p>

## Getting Started

The fastest way to get started using Urbit Dashboard is by visiting [https://urbitdashboard.com/](https://urbitdashboard.com/)

## Compile It Yourself

To get started first clone this repo:

```
$ git clone https://github.com/dcSpark/urbit-dashboard
```

Once you have done that simply use `npm` to compile it yourself:

```
$ cd urbit-dashboard
$ npm install
$ npm start
```

## For Developers

Urbit Dashboard is the premier example of how developers can interact with the Urbit Visor API to build full fledged web apps.

The dashboard provides examples for how to:

- Create a login/connection experience for end users
- Ask Urbit Visor for permissions
- Scry
- Execute threads
- Issue pokes
- Start subscriptions
- Query ship for initial state
- Support hot-swapping
- And more

Take a look in the `src` folder to see how all of the above use cases are implemented.
