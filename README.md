# ObsidianPost Backend API

A RESTful API for a blog application enabling user management, post creation/management, and commenting features.

## Overview

ObsidianPost Backend API provides the server-side logic and data persistence for the ObsidianPost blog platform. Built with Node.js, Express, and Prisma ORM connecting to a PostgreSQL database, it handles user authentication (signup, login, author status upgrades) via JWT, manages blog posts (CRUD, publishing status), and allows users to comment on posts (CRUD). It enforces authorization rules based on user roles (regular user vs. author).

## Features

-   User Authentication: Secure JWT-based signup and login.
-   User Management: Retrieve user details and upgrade users to author status using a secret code.
-   Post Management: Full CRUD operations for blog posts, including publish/unpublish functionality.
-   Comment Management: Full CRUD operations for comments associated with specific posts.
-   Authorization: Differentiates permissions between regular users and authors for modifying/deleting content.
-   Relational Data: Manages relationships between users, posts, and comments using Prisma.
-   API Endpoints: Clear and structured routes for frontend consumption.

## Technology Stack

-   Backend: Node.js, Express
-   Database: PostgreSQL with Prisma ORM
-   Authentication: Passport.js with JWT Strategy (`passport-jwt`), `jsonwebtoken`
-   Security: `bcryptjs` for password hashing, `dotenv` for environment variables
-   Middleware: `cors` for cross-origin requests

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/JoseVS1/blog-api.git
    cd blog-api
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the root directory with the following variables:
    ```env
    DATABASE_URL="postgresql://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:5432/obsidianpost"
    JWT_SECRET=YOUR_RANDOM_JWT_SECRET
    AUTHOR_CODE=YOUR_SECRET_AUTHOR_CODE
    PORT=3000
    ```
    *(Replace placeholders with your actual database credentials, a secure secret, and the author code)*

4.  Set up the database using Prisma:
    ```bash
    npx prisma migrate dev --name init
    ```

5.  Start the server:
    ```bash
    npm start
    ```
    *(Or `node app.js` if no start script is defined)*

## Project Structure

```
./
├── config
│   └── passport.js
├── controllers
│   ├── apiController.js
│   ├── commentController.js
│   ├── postCommentController.js
│   ├── postController.js
│   └── userController.js
├── models
│   └── prismaClient.js
├── prisma
│   └── schema.prisma
├── routes
│   ├── apiRoutes.js
│   ├── commentRoutes.js
│   ├── postCommentRoutes.js
│   ├── postRoutes.js
│   └── userRoutes.js
└── app.js
```

## Usage

This backend provides API endpoints intended to be consumed by a frontend client application (like the ObsidianPost Frontend). Start the server, and it will listen for requests on the configured port (default 3000).

## API Endpoints

### API Routes (`/api`)
-   `GET /` - Welcome message for the API.

### User Routes (`/api/users`)
-   `POST /signup` - Register a new user.
-   `POST /login` - Authenticate a user and return a JWT token.
-   `GET /:id` - Get details for a specific user.
-   `PUT /:id/author` - Upgrade a user to author status (Requires JWT Authentication).

### Post Routes (`/api/posts`)
-   `GET /` - Retrieve all posts.
-   `GET /:id` - Retrieve a single post by ID.
-   `POST /` - Create a new post (Requires JWT Authentication).
-   `PUT /:id` - Update an existing post (Requires JWT Authentication).
-   `DELETE /:id` - Delete a post (Requires JWT Authentication).

### Post-Comment Routes (`/api/posts/:id/comments`)
-   `GET /` - Retrieve all comments for a specific post.
-   `POST /` - Create a new comment for a specific post (Requires JWT Authentication).

### Comment Routes (`/api/comments`)
-   `PUT /:id` - Update an existing comment (Requires JWT Authentication).
-   `DELETE /:id` - Delete a comment (Requires JWT Authentication).

## Security

-   Passwords are securely hashed using `bcryptjs`.
-   Stateless authentication is implemented using JSON Web Tokens (JWT).
-   Passport.js middleware (`passport-jwt`) validates tokens for protected routes.
-   Authorization logic within controllers ensures users can only modify/delete their own content unless they have author privileges.
-   CORS middleware is enabled to control cross-origin access.
-   Sensitive information (secrets, database URL) is managed via environment variables (`dotenv`).

## Contributing

1.  Fork the repository
2.  Create a feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add some amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

## License

MIT License

## Acknowledgements

-   [Express.js](https://expressjs.com/)
-   [Prisma](https://www.prisma.io/)
-   [Passport.js](http://www.passportjs.org/)
-   [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
-   [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
-   [cors](https://github.com/expressjs/cors)
-   [dotenv](https://github.com/motdotla/dotenv)
