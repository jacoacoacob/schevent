# Schevent Backend

This is a NestJS backend for **Schevent**, a simple calendar event management application.

_Checkout the **Schevent** React / Next.js frontend [here](https://github.com/jacoacoacob/schevent-frontend)._


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

## Design Choices and Areas for Improvement

**Todo**:
- Unit tests
- Use task queue for notifications https://docs.nestjs.com/techniques/queues
- Allow notifications to be sent more than once if a given `CalendarEvent`'s `startsAt` value is changed (there are at least a few ways to handle this...)
- API Versioning