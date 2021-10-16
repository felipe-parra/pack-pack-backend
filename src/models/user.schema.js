const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { genSalt } = require("../config");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 128,
    },
    mail: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 128,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    password: {
      type: String,
      required: true,
      maxlength: 255,
    },
    age: {
      type: Number,
      maxlength: 3,
    },
    gender: {
      type: String,
    },
    hobbies: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
};

userSchema.statics.checkPassword = async (password, receivePassword) => {
  const decodedPass = await bcrypt.compare(password, receivePassword);
  return decodedPass;
};

userSchema.statics.emailValidation = async (email) => {
  const emailValidation =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailValidation.test(String(email).toLowerCase());
};


const User = model("User", userSchema);

module.exports = User;
