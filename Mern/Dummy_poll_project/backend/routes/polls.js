const express = require("express");
const router = express.Router();
const {handleGetAll, handleCreate, handleUpdate} = require("../controllers/polls");

router.get("/getAll", handleGetAll);
router.post("/create", handleCreate);
router.patch("/vote", handleUpdate);

module.exports = router;