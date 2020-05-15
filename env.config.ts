const config = {
  local: {
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "admin",
    database: "decay_station_db",
    synchronize: false,
    port: 3306,
    entities: ["database/models/**/*{.ts,.js}"],
    migrations: ["migration/*{.ts,.js}"],
    cli: {
      "migrationsDir": "migration"
    },
    logging: true
  },
  develop: {
    type: "mysql",
    host: "pqxt96p7ysz6rn1f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    username: "bj4alzy72l2assng",
    password: "xtq0vfe138pp4y9e",
    database: "s1ffv09bhuwco1mt",
    synchronize: false,
    port: 3306,
    entities: "dist/database/models/**/*.js",
    migrations: "migration/*.js",
    cli: {
      "migrationsDir": "migration"
    },
    logging: true
  }
}

const env = (envName?: string) => {
  if(!envName) {
    return config.local
  }
  return config[envName]
};

export default env;