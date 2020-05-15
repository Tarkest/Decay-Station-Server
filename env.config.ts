const config = {
  local: {
    entities: "database/models/**/*{.ts,.js}",
    migrations: "migration/*{.ts,.js}",
  },
  develop: {
    entities: "dist/database/models/**/*.js",
    migrations: "migration/*.js",
  }
}

const env = (envName?: string) => {
  if(!envName) {
    return config.develop
  }
  return config[envName]
};

export default env;