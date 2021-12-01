import 'dotenv/config';

const getEnvironmentVariableOrThrow = (variableName: string) => {
  const variable = process.env[variableName];
  if (!variable) throw new Error(`Could not find environment variable ${variableName}.`);
  return variable;
};

export const env = {
  getMariadbHost: () => getEnvironmentVariableOrThrow('MARIADB_HOST'),
  getMariadbUser: () => getEnvironmentVariableOrThrow('MARIADB_USER'),
  getMariadbPassword: () => getEnvironmentVariableOrThrow('MARIADB_PASSWORD'),
  getMariadbDatabase: () => getEnvironmentVariableOrThrow('MARIADB_DATABASE'),
  getJwtSecret: () => getEnvironmentVariableOrThrow('JWT_SECRET'),
};
