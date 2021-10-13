const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({
    test: "Hello",
  });
});

module.exports = router;
