const mongoose = require("mongoose");
const { dbUriMongoLocal } = require("../config");

const dbUri = String(dbUriMongoLocal);

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info("Database connected");
  })
  .catch((err) => {
    console.error("DB error", err);
    process.exit(1);
  });
