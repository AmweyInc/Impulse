## Project Setup Guide

To deploy the project, follow these steps:

### Running the Project

1. Open a terminal and navigate to the `api-gateway-service` folder.

2. Run the following commands to launch Docker containers:
   ```bash
   docker-compose build
   docker-compose up ```

3. After that, return to the api-gateway-service folder and perform the following actions:

4. Install dependencies using:

```bash
    cd api-gateway-service
    yarn install
```
Run migrations to create tables in the database:

```bash
yarn run migration:run
```
5. Navigate to the api-user-service folder and install dependencies:

```bash
cd ../api-user-service
yarn install
```
Start the user service in development mode:

```bash
yarn run start:dev
```
6. Go to the api-auth-service folder and install dependencies:

```bash
cd ../api-auth-service
yarn install
```
Start the authentication service in development mode:

```bash
yarn run start:dev
```
7. Finally, return to the api-gateway-service folder and launch the main API gateway in development mode:

```bash
cd ../api-gateway-service
yarn run start:dev
```

### Routes
**POST /api/v1/user/info** - Protected route, requires a Bearer token for JWT. Send a request with the token in the Authorization: Bearer <token> header and payload:

```JSON
{
  "email": "example@mail.com"
}
```
The server will return user data.

**POST /api/v1/auth/signUp** - User registration. Send a request with the payload:

```JSON
{
  "email": "example@example.com",
  "password": "mysecret",
  "name": "John Doe"
}
```
The route will respond with information about account creation.

**POST /api/v1/auth/signIn** - Authentication. Send a request with the payload:

```JSON
{
  "email": "example@example.com",
  "password": "mysecret"
}
```
The route will return a Bearer token.

**POST /api/v1/auth/refresh** - Token refresh. Pass the current Bearer token in the request header. The route will return the refreshed token if the current token is valid.

This guide will help you deploy the project and utilize the routes to interact with the services.
