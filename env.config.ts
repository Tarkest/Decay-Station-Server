const config = {
  local: {
    entities: "database/models/**/*{.ts,.js}"
  },
  develop: {
    entities: "database/models/**/*.js"
  }
}

const env = (envName?: string) => {
  if(!envName) {
    return config.develop
  }
  return config[envName]
};

export default env;