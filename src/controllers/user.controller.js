const User = require("../models/user.schema");
const { handleErrorResponse, handleSuccessResponse } = require("../utils");

const getAllUsers = async (req, res) => {
  try {
    const usersReceived = await User.find({ $sort: { createdAt: 1 } });

    usersReceived.map((item) => {
      delete item["_doc"].password;
      return item;
    });

    handleSuccessResponse({
      statusCode: 200,
      msg: "users listed",
      data: usersReceived,
      res,
    });
  } catch (error) {
    console.log(error);
    handleErrorResponse({ res });
  }
};

const getOneUser = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      handleErrorResponse({ error: "Missing id" });
    }
    let userFound = await User.findById(userId);

    delete userFound["_doc"].password;
    handleSuccessResponse({
      statusCode: 200,
      msg: "user listed",
      data: userFound,
      res,
    });
  } catch (error) {
    console.log(error);
    handleErrorResponse({ res });
  }
};
const createOneUser = async (req, res) => {
  try {
    const user = {
      ...req.body,
    };

    user.password = await User.encryptPassword(user.password);

    const emailValidation = await User.emailValidation(user.mail);

    if (!emailValidation) {
      handleErrorResponse({ res, msg: "Email not valid" });
    }

    let userCreated = await User.create({ ...user });

    const payload = {
      id: userCreated.mail,
    };

    delete userCreated.password;
    handleSuccessResponse({
      statusCode: 201,
      msg: "register successfully",
      data: { ...userCreated },
      res,
    });
  } catch (error) {
    handleErrorResponse({ res });
  }
};
const updateOneUser = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      handleErrorResponse({ msg: "Missing id" });
    }
    const userUpdated = await User.findByIdAndUpdate(userId, { ...req.body });

    handleSuccessResponse({
      statusCode: 200,
      msg: "user updated successfully",
      data: userUpdated,
      res,
    });
  } catch (error) {
    handleErrorResponse({ res });
  }
};

const deleteOneUser = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      handleErrorResponse({ msg: "Missing id" });
    }
    const userDeleted = await User.findByIdAndDelete(userId);
    console.log("userDeleted", userDeleted);
    handleSuccessResponse({
      statusCode: 200,
      msg: "user deleted successfully",
      data: userDeleted,
      res,
    });
  } catch (error) {
    handleErrorResponse({ res });
  }
};

const searchByQuery = async (req, res) => {
  console.log(req.query);
  const { name, hobbies } = req.query;
  console.log(name, hobbies);
  const xd = await User.emailValidation(name);

  try {
    const usersReceived = await User.find({
      $or: [{ name: name }, { hobbies: hobbies }],
    });

    handleSuccessResponse({
      statusCode: 200,
      msg: "users listed",
      data: usersReceived ? usersReceived : [],
      res,
    });
  } catch (error) {
    handleErrorResponse({ res });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createOneUser,
  updateOneUser,
  deleteOneUser,
  searchByQuery,
};
