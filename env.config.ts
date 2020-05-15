const config = {
  local: {
    entities: "database/models/**/*{.ts,.js}"
  },
  develop: {
    entities: "dist/database/models/**/*.js"
  }
}

const env = (envName?: string) => {
  if(!envName) {
    return config.develop
  }
  return config[envName]
};

export default env;