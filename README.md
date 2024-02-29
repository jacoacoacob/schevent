# Schevent Backend



## Running Locally

**Requirments**
- Node.js
- Docker Compose

From the project root:

1. Install dependencies
```sh
npm i
```

2. Create MongoDB Docker container
```sh
docker compose up -d
```

3. Start the server
```sh
npm start
```

## Design Choices and Areas for Improvement

**Todo**:
- Versioning
- Use task queue for notifications https://docs.nestjs.com/techniques/queues
- Unit tests
- Allow notifications to be sent more than once if a given `CalendarEvent`'s `startsAt` value is changed (there are at least a few ways to handle this...)