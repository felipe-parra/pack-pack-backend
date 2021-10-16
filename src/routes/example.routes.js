const router = require("express").Router();

const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("../controllers/example.controllers");

// GET ALL
router.get("/", getAll);
// GET ONE
router.get("/:id", getOne);
// CREATE
router.post("/", createOne);
// UPDATE
router.put("/:id", updateOne);
// DELETE
router.delete("/:id", deleteOne);

module.exports = router;
