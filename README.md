# Rise-vest-assessment Server

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/16662064-dc5ccb7b-6c79-4b95-805c-003731c2d8af?action=collection%2Ffork&collection-url=entityId%3D16662064-dc5ccb7b-6c79-4b95-805c-003731c2d8af%26entityType%3Dcollection%26workspaceId%3D70bd2b92-da20-44a4-be3c-5918db452545)

## Run in SwaggerUI
# https://risevest-cloud-api.herokuapp.com/api/v1/docs/#/
## Getting the App Locally

1. Clone this repository with this command
```bash
# git clone https://github.com/Smeks-ops/risevest-assessment
```

## Installing Without Docker

2. Install dependencies with this command
```bash
npm install
```

3. Ensure you have the local .env file for configuration parameters. A **sample.env** file is shown in the folder directory for guide.

4. Run the app in development environment using this command
```bash
npm run start:dev
```
## Installing With Docker

5. Use docker to setup / startup postgresDB using the command:

```bash
docker build -t risevest_data_management . && docker run -p 4500:3000 -t risevest_data_management
```
NB: The port ```4500``` varies depending on you but the container is listening on port 3000

## Running tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
