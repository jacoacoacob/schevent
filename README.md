# Schevent Backend

This is a NestJS backend for **Schevent**, a simple calendar event management system.

_Checkout the **Schevent** React / Next.js frontend [here](https://github.com/jacoacoacob/schevent-frontend)._

## Notable files and folders
- [./docker-compose.yml](./docker-compose.yml) configuration for MongoDB docker container service
- [./src/notifications/notifications.service.ts](./src/notifications/notifications.service.ts) where notification system logic is defined (and mocked) 
- [./src/events/events.controller.ts](./src/events/events.controller.ts) Creates REST API endpoints for `/events` and handles HTTP requests and response
- [./src/events/events.service.ts](./src/events/events.service.ts) Handles database CRUD database operations for events

## Design Choices

I used `@nestjs/schedule` to create a cron-based notification system that queries the database for events whose start times are greater than or equal to now and less than or equal to half an hour from now. Since the frontend enforces that users may only create events with start times at 5 minute intervals on the hour, I created a cron job that queries the database at 5 minute intervals on the hour; sends notifications to invitees for each event; and marks notifications as having been sent for that event. 

I created a Swagger-enabled REST API for event CRUD operations so that I could use [openapi-typescript](https://openapi-ts.pages.dev/introduction) and [openapi-fetch](https://openapi-ts.pages.dev/openapi-fetch/) to generate typescript interfaces and create a fetch client with typed request / response values on the [frontend](https://github.com/jacoacoacob/schevent-frontend). GraphQL is definitely the other obvious choice for schema driven full stack development but I was more comfortable with Swagger and REST conventions and went with them for the sake of time.

 create a typed fetch client on the frontend 


## Running Locally

**Requirments**
- [Node.js 16](https://nodejs.org/en) or later (strongly consider using [`nvm`](https://github.com/nvm-sh/nvm) to manage Node versions)
- [Docker Compose](https://docs.docker.com/compose/) to run a local MongoDB database (or just have [MongoDB](https://www.mongodb.com/) running on your machine) 

From the project root:

1. Install dependencies
```sh
npm i
```

2. Create MongoDB Docker container
```sh
docker compose up -d
```

3. Start the development server
```sh
npm run start:dev
```

## Areas for Improvement
- Unit tests
- Use task queue for sending notifications https://docs.nestjs.com/techniques/queues
- Allow notifications to be sent more than once if a given `CalendarEvent`'s `startsAt` value is changed (there are at least a few ways to handle this...)
- API Versioning
- Authentication