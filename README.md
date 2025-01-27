# NestJS Template

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeORM**: An ORM for TypeScript and JavaScript (ES7, ES6, ES5) that supports various databases.
- **Repository Layer**: A data access layer that abstracts the database operations.
- **JWT Authentication**: Secure your API endpoints with JSON Web Tokens.
- **Redis Caching**: Improve performance with Redis caching.
- **CRUD Operations**: Basic CRUD operations for User and Card entities.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Redis

### Database Migrations

Generate a new migration:

```bash
npm run migration:generate -- <MigrationName>
```

Run the migrations:

```bash
npm run migration:run
```

### Running the Application

Start the application:

```bash
npm run dev
```

The application will be running at `http://localhost:9000`.

## API Endpoints

### User

- **Create User**: `POST /users`
- **Get Users**: `GET /users`
- **Get User by ID**: `GET /users/:id`
- **Update User**: `PUT /users/:id`
- **Delete User**: `DELETE /users/:id`

### Card

- **Create Card**: `POST /cards`
- **Get Cards**: `GET /cards`
- **Get Card by ID**: `GET /cards/:id`
- **Update Card**: `PUT /cards/:id`
- **Delete Card**: `DELETE /cards/:id`

## Authentication

Authenticate using JWT tokens. Include the token in the `Authorization` header as follows:

```
authorization: your-token
```

## Caching

Redis is used for caching to improve performance. Ensure Redis is running and configured correctly in your environment variables.

## Contributing

Feel free to submit issues and pull requests. For major changes, please open an issue first to discuss what you would like to change.

Happy coding! 🚀
