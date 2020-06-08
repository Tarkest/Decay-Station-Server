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
    migrations: ["database/migration/*{.ts,.js}"],
    cli: {
      "migrationsDir": "migration"
    },
    logging: true,
    migrationsRun: true
  },
  develop: {
    type: "mysql",
    host: "pqxt96p7ysz6rn1f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    username: "bj4alzy72l2assng",
    password: "xtq0vfe138pp4y9e",
    database: "s1ffv09bhuwco1mt",
    synchronize: false,
    port: 3306,
    entities: ["dist/database/models/**/*.js"],
    migrations: ["dist/database/migration/*.js"],
    cli: {
      "migrationsDir": "migration"
    },
    logging: true,
    migrationsRun: true
  },
  stage: {
    type: "mysql",
    host: "qf5dic2wzyjf1x5x.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    username: "raz0hrf6xfrnbj63",
    password: "pc0ohlf98zuz77le",
    database: "eblgnvo8ssprsukj",
    synchronize: false,
    port: 3306,
    entities: ["dist/database/models/**/*.js"],
    migrations: ["dist/database/migration/*.js"],
    cli: {
      "migrationsDir": "migration"
    },
    logging: false,
    migrationsRun: true
  },
  production: {
    type: "mysql",
    host: "sq65ur5a5bj7flas.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    username: "gr6b6aeug676zecg",
    password: "o6ulnu8t9hzswkpt",
    database: "ncc4t5ui4s4ql5ve",
    synchronize: false,
    port: 3306,
    entities: ["dist/database/models/**/*.js"],
    migrations: ["dist/database/migration/*.js"],
    cli: {
      "migrationsDir": "migration"
    },
    logging: false,
    migrationsRun: true
  }
}

const env = (envName?: string) => {
  if(!envName) {
    return config.local
  }
  return config[envName]
};

export default env;