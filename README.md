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
# frontend url
FRONTEND_URL="http://localhost:3000"
# mariadb connection credentials
MARIADB_HOST="127.0.0.1"
MARIADB_USER="root"
MARIADB_PASSWORD=""
MARIADB_DATABASE="agora"
```
\*The jsonwebtoken secret is recommended to be a random-generated 32 character long string that includes upper and lower case characters, numbers, as well as symbols. Any random string or password generator can be used, such as [this](https://randompasswordgen.com/).

**4.** Prepare the database by executing the SQL setup script that can be found at `docs/setup.sql`. This will create the database `agora` and all the necessary tables and indexes.

**5.** Start the server in development mode with hot-reloading enabled
```bash
npm run dev
```
or alternatively
```bash
npm start
```

**6a. (optional)** Create a production build
```bash
npm run build
```

**6b. (optional)** Start the server in production mode
```bash
npm run prod
```

**7.** Access the API using any client (e.g. Postman) at
```bash
http://localhost:5000/api
```

**8. (optional)** Run ESLint code style check at any time during development. Use the `:fix` suffix to fix issues that ESLint can automatically fix.
```bash
npm run lint
npm run lint:fix
```

## CI/CD

A GitHub action has been set up to be triggered by a push - including a pull request merge - to the `main` branch of the repository, and re-deploy the express server to the host. The database content and uploaded files will be persisted between deployments.

## Generate mock data

The `scripts/generate-mock-data.js` script will generate 50 random users, 200 random posts, and a random amount of comments (up to 10) and reactions (up to 50) for each post. The script can be executed by running
```bash
npm run gen-mock-data
```
