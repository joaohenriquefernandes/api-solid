# <img align="center" alt="API Rest" height="40" width="45" src="https://user-images.githubusercontent.com/25181517/192107858-fe19f043-c502-4009-8c47-476fc89718ad.png"> - API SOLID

Check Ins Api developed on Rocketseat Node Ignite trail

## 💻 | Technology

<div style="display: inline_block">
  <img align="center" alt="Node.js" height="40" width="45" src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original.svg">
  <img align="center" alt="TypeScript" height="40" width="45" src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg">
  <img align="center" alt="Fastify" height="40" width="45" src="https://user-images.githubusercontent.com/46967826/235814699-7bf7e5ce-19d1-469b-9efe-fe89412349d8.png">
  <img align="center" alt="Docker" height="40" width="45" src="https://github.com/devicons/devicon/blob/master/icons/docker/docker-original.svg">
  <img align="center" alt="PostgreSQL" height="40" width="45" src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original.svg">
  <img align="center" alt="Prisma" height="40" width="45" src="https://github.com/devicons/devicon/blob/master/icons/prisma/prisma-original.svg">
  <img align="center" alt="Vitest" height="40" width="45" src="https://vitest.dev/logo-shadow.svg">
  <img align="center" alt="ESlint" height="40" width="45" src="https://github.com/devicons/devicon/blob/master/icons/eslint/eslint-original.svg">
  <img align="center" alt="Git" height="40" width="45" src="https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png">
</div>

## 👨‍💻 | Running Project

Clone this repository

```bash
  git clone https://github.com/joaohenriquefernandes/api-solid.git
  cd api-solid
```

Dependency installs

```bash
  npm install
```

Creating the containers from the docker-compose file

```bash
  docker-compose up -d
```

Running migrations

```bash
  npx prisma migrate:dev
```

Starting project

```bash
  npm run dev
```

## 📍 | Routes

| Method   | Route                            | Description                |
| -------- | -------------------------------- | -------------------------- |
| `POST`   | `/gyms/:gymId/check-ins`         | Create a new check in      |
| `PATCH`  | `/check-ins/:checkInId/validate` | Validate a check in        |
| `GET`    | `/check-ins/history`             | Get the check in history   |
| `GET`    | `/check-ins/metrics`             | Get the check in metrics   |
| `POST`   | `/gyms`                          | Create a new gym           |
| `GET`    | `/gyms/search`                   | Search gyms                |
| `GET`    | `/gyms/nearby`                   | Get nearby gyms            |
| `POST`   | `/register`                      | Create a new user          |
| `POST`   | `/sessions`                      | Authenticate a user        |
| `PATCH`  | `/token/refresh`                 | Create a refresh token     |
| `GET`    | `/me`                            | Get the user profile       |

## 🟣 | Project Insomnia

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=API%20SOLID&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fjoaohenriquefernandes%2Fapi-solid%2Fmain%2Finsomnia.json)

## 🧪 | Automated Unit Tests

- [x] Should be able to authenticate
- [x] Should not be able to authenticate with wrong email
- [x] Should not be able to authenticate with wrong password
- [x] Should be able to check in
- [x] Should not be able to check in twice in same day
- [x] Should be able to check in twice in different day
- [x] Should not be able to check in on distance gym
- [x] Should be able to create gym
- [x] Should be able to fetch nearby gyms
- [x] Should be able to fetch check ins history
- [x] Should be able to fetch paginated user check in history
- [x] Should be able to get check-ins count from metrics
- [x] Should be able to get user profile
- [x] Should not be able to get user profile with wrong id
- [x] Should be able to register
- [x] Should hash user password upon registration
- [x] Should not be able to resgister with same email twice
- [x] Should be able to search for gyms
- [x] Should be able to fetch paginated gyms search
- [x] Should be able to validate the check-in
- [x] Should not be able to validate an inexistent check-in
- [x] Should not be able to validate the check-in after 20 minutes of this creation

Running unit tests

```bash
  npm test
```

## 🧪 | Automated End-to-End Tests

- [x] Should be able to create check in
- [x] Should be able to list history check ins
- [x] Should be able to get mestrics check ins
- [x] Should be able to validate a check in

Running e2e tests

```bash
  npm test:e2e
```

## Functional Requirements (FRs)

- [x] Users must be able to register.
- [x] Users must be able to authenticate.
- [x] Users must be able to retrieve the profile of a logged-in user.
- [x] Users must be able to retrieve the number of check-ins performed by the logged-in user.
- [x] Users must be able to retrieve their check-in history.
- [x] Users must be able to search for nearby gyms.
- [x] Users must be able to search for gyms by name.
- [x] Users must be able to check-in at a gym.
- [x] Users must be able to validate their check-in.
- [x] Gyms must be able to register.

## Business Rules (BRs)

- [x] Users cannot register with duplicate emails.
- [x] Users cannot perform 2 check-ins on the same day.
- [x] Users cannot check-in if they are not close (within 100m) to the gym.
- [x] Check-ins can only be validated up to 20 minutes after creation.
- [x] Check-ins can only be validated by administrators.
- [x] Gyms can only be registered by administrators.

## Non-functional Requirements (NFRs)

- [x] User passwords must be encrypted.
- [x] Application data must be persisted in a PostgreSQL database.
- [x] All data lists must be paginated with 20 items per page.
- [x] Users must be identified by a JSON Web Token (JWT).
