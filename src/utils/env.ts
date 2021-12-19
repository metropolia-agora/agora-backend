import 'dotenv/config';

const getEnvironmentVariableOrThrow = (variableName: string) => {
  const variable = process.env[variableName];
  if (variable === undefined) throw new Error(`Could not find environment variable ${variableName}.`);
  return variable as string;
};

export const env = {
  getJwtSecret: () => getEnvironmentVariableOrThrow('JWT_SECRET'),
  getFrontendUrl: () => getEnvironmentVariableOrThrow('FRONTEND_URL'),
  getMariadbHost: () => getEnvironmentVariableOrThrow('MARIADB_HOST'),
  getMariadbUser: () => getEnvironmentVariableOrThrow('MARIADB_USER'),
  getMariadbPassword: () => getEnvironmentVariableOrThrow('MARIADB_PASSWORD'),
  getMariadbDatabase: () => getEnvironmentVariableOrThrow('MARIADB_DATABASE'),
};
