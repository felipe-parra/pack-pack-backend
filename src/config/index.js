require("dotenv").config();

const config = {
  port: process.env.PORT,
  versionApi: process.env.VERSION_API,
  dbUriMongoAtlas: process.env.DB_URI_MONGO_ATLAS,
  dbUriMongoLocal: process.env.DB_URI_MONGO_LOCAL,
  dbMongoUser: process.env.DB_MONGO_USER,
  dbMongoPass: process.env.DB_MONGO_PASS,
  dbMongoName: process.env.DB_MONGO_NAME,
  appSecret: process.env.APP_SECRET,
  jwtSecret: String(process.env.JWT_SECRET),
  genSalt: process.env.GEN_SALT,
  timeExpiresToken: 86400,
};

module.exports = config;
