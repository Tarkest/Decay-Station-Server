const config = {
  develop: {
    dbHost: "pqxt96p7ysz6rn1f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    dbPassword: "xtq0vfe138pp4y9e",
    dbUser: "bj4alzy72l2assng",
    dbName: "s1ffv09bhuwco1mt"
  }
}

const env = (envName?: string) => {
  if(!envName) {
    return config.develop
  }
  return config[envName]
};

export default env;