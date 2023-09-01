# Cryptocurrency portfolio

Web application to manage cryptocurrency portfolios.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Table of contents

- [Cryptocurrency portfolio](#cryptocurrency-portfolio)
  - [Table of contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Technical requirements](#technical-requirements)
  - [API uses](#api-uses)
  - [Start server](#start-server)
  - [Development server](#development-server)
  - [Code scaffolding](#code-scaffolding)
  - [Build](#build)
  - [Running unit tests](#running-unit-tests)
  - [Running end-to-end tests](#running-end-to-end-tests)
  - [Further help](#further-help)


## Requirements

- Implement CRUD for currencies, portfolios and portfolio lines. Note that portfolio lines are children of portfolios and they are referenced by an id. Lines also have a reference to their coin.
- Use provided db.json file and json-server as your backend
- OPTIONAL: Acronym can be validated against a list to check if it is a real coin before adding it to the backend
  - Service: https://min-api.cryptocompare.com/data/all/coinlist
- OPTIONAL: When showing portfolio lines add a the current value of each line. This service can be used:
  - https://www.cryptocompare.com/api/
  - Ex: https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=EUR
  - Calls to this service should be cached when possible
- OPTIONAL: When showing portfolio list, also shows the total portfolio value in EUR. You can use previous service to retrieve conversion between cripto/EUR.


<div style="display: flex; justify-content: flex-end;">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Technical requirements

- A usable UI will be valuable
- Start instructions for the project and dependencies should be delivered
- Use NPM for dependency management
- OPTIONAL: Use TypeScript

<div style="display: flex; justify-content: flex-end;">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## API uses

- Currencies:
  - GET http://localhost:3000/coins
  - POST http://localhost:3000/coins
  - PUT http://localhost:3000/coins/1
  - DELETE http://localhost:3000/coins/1
- Portfolios:
  - GET http://localhost:3000/portfolios
  - POST http://localhost:3000/portfolios
  - PUT http://localhost:3000/portfolios/1
  - DELETE http://localhost:3000/portfolios/1
- Portfolio lines:
  - GET http://localhost:3000/portfolios/1/lines
  - POST http://localhost:3000/portfolios/1/lines
  - PUT http://localhost:3000/portfolios/1/lines/1
  - DELETE http://localhost:3000/portfolios/1/lines/1

You can _expand the parents and _embed the children. For instance, if you call GET http://localhost:3000/portfolios/1/lines?_expand=coin&_expand=portfolio, you will receive an array of lines with their corresponding coin and portfolio. Calling http://localhost:3000/portfolios/1?_embed=lines will embed lines into the portfolio.

<div style="display: flex; justify-content: flex-end;">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Start server

Run `json-server --watch db.json` to start the server. Navigate to `http://localhost:3000/`. The server will automatically reload if you change any of the source files.

<div style="display: flex; justify-content: flex-end;">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

<div style="display: flex; justify-content: flex-end;">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

<div style="display: flex; justify-content: flex-end;">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

<div style="display: flex; justify-content: flex-end;">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

<div style="display: flex; justify-content: flex-end;">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

<div style="display: flex; justify-content: flex-end;">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

<div style="display: flex; justify-content: flex-end;">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>
