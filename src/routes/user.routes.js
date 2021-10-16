const router = require("express").Router();
const {
  getAllUsers,
  getOneUser,
  createOneUser,
  updateOneUser,
  deleteOneUser,
  searchByQuery,
} = require("../controllers/user.controller");

const { verifyToken } = require("../middlewares/verifyJwt");

// SEARCH BY QUERY
router.get("/search?", verifyToken, searchByQuery);

// GET ALL
router.get("/", verifyToken, getAllUsers);

// GET ONE
router.get("/:userId", verifyToken, getOneUser);

// CREATE ONE
router.post("/", verifyToken, createOneUser);

// UPDATE
router.put("/:userId", verifyToken, updateOneUser);

// DELETE
router.delete("/:userId", verifyToken, deleteOneUser);

module.exports = router;
