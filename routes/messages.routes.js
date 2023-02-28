const express = require("express");
const {
  getAllBy,
  send,
  edit,
  remove,
} = require("../controllers/messages.controller");
const { authenticateUser, dataValidator } = require("../middlewares");
const { createMessageSchema } = require("../validators");

const router = express.Router();

router.get("/:car_id/:sender_id", getAllBy);

router.post(
  "/chat",
  [authenticateUser, dataValidator(createMessageSchema)],
  send
);

router.put(
  "/chat/:id",
  [authenticateUser, dataValidator(createMessageSchema)],
  edit
);

router.delete("/chat/:id", authenticateUser, remove);

module.exports = router;
