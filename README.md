# Composite

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.

## First-time setup

### Prerequisites

Node (LTS, v14.x) - https://nodejs.org/en/download/
Angular CLI - https://angular.io/cli#installing-angular-cli

### Setup

Clone this repository, and run `npm install` at the root of this repository.

## Running

Run `npm start` to build the Angular code and run the Electron app.

## Tools

### Reloading

When running through NPM, Composite will run with hot reloading by default. When modifying Composite, hot reloading will only reload parts of the application that were modified. This mode can also be started with the npm script `start:hot-reload`.

Another option is to run Composite with live reloading. When modifying Composite, live reloading will reload the whole page when a file is modified. This mode can be started with the npm script `start:live-reload`.

To run Composite without reloading, use the npm script `start:file`. This will load the web page from a file, and more closely resembles how it runs when packaged as an individual executable.

Note that when using reloading, it serves the Angular pages on port 4200.
