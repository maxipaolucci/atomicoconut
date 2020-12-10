# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--configuration=production` flag for a production build or `--configuration=testing` for a testing env build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## PWA local environment

To test in a local environment using PWA config do the following:
1) In package.json replace: `"start": "ng serve --hmr --host 0.0.0.0 --disable-host-check --public-host http://localhost:2222",` with `"start": "http-server -p 4200 -c-1 -a 0.0.0.0 dist/client",`
2) In docker-compose.yml, in acclient comment out `dockerfile: Dockerfile.dev` and uncomment: `dockerfile: Dockerfile.dev.pwa`
3) Run `docker-compose up --build`

Then to rebuild changes in the angular sources during development we need to:
1) login into the client container: `docker exec -ti atomicoconut_acclient_1 sh`
2) rebuild with testing configuration because it has PWA enabled: `ng build --configuration testing` 