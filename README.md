# Agora (backend)

> Agora *ag·o·ra*
>
> *plural* **agoras** *or* **agorae**
>
> The center of the athletic, artistic, business, social, spiritual and political life in the city.

## Prerequisites

- Node (>= 16.0.0) and npm (>= 8.0.0) can be installed from [here](https://nodejs.org/en/)
- MariaDB (>= 10.6.5) can be installed from [here](https://mariadb.org/)
- (optional) GitHub Desktop client can be installed from [here](https://desktop.github.com/)
- (optional) ESLint extension for [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) or [WebStorm](https://www.jetbrains.com/help/webstorm/eslint.html)

## Usage

**1.** Clone this repository using any git client
```bash
git clone https://github.com/metropolia-agora/agora-backend.git
```

**2.** Install the dependencies using npm
```bash
npm install
```

**3.** Create a file in the project root directory named `.env` and place the following content into it. Make sure to replace these placeholder values with the actual secrets and connection details you wish to use.
```bash
# jsonwebtoken secret
JWT_SECRET=""
# mariadb connection credentials
MARIADB_HOST="127.0.0.1"
MARIADB_USER="root"
MARIADB_PASSWORD=""
MARIADB_DATABASE="agora"
```
\*The jsonwebtoken secret is recommended to be a random-generated 32 character long string that includes upper and lower case characters, numbers, as well as symbols. Any random string or password generator can be used, such as [this](https://randompasswordgen.com/).

**4.** Start the server in development mode with hot-reloading enabled
```bash
npm run dev
```
or alternatively
```bash
npm start
```

**5a. (optional)** Create a production build
```bash
npm run build
```

**5b. (optional)** Start the server in production mode
```bash
npm run prod
```

**6.** Access the API using any client (e.g. Postman) at
```bash
http://localhost:5000/api
```

**7. (optional)** Run ESLint code style check at any time during development
```bash
npm run lint
```

## CI/CD

A GitHub action has been set up to be triggered by a push - including a pull request merge - to the `main` branch of the repository, and re-deploy the express server to the host. The database content and uploaded files will be persisted between deployments.

## API documentation

For an exhaustive list of all available API endpoints, authorization information, request and response parameters, as well as request and response samples view the API documentation written in OpenAPI 3 format at `docs/api.yaml`. To run a user-friendly API documentation server using `redoc-cli` run the following command:
```bash
npm run api
```
To run the API documentation server in watch mode (no hot-reloading supported, refresh manually) run:
```bash
npm run api:dev
```
To view the API documentation server in the browser open
```bash  
http://localhost:8080/  
```
