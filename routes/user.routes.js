const express = require("express");
const { login } = require("../controllers/auth.controller");
const {
  register,
  getAll,
  getId,
  update,
  deleteUser,
  verifyUser,
} = require("../controllers/user.controller");
const { dataValidator, authenticateUser } = require("../middlewares");
const {
  createUpdateUserSchema,
  loginSchema,
  verifyEmailSchema,
} = require("../validators");

const router = express.Router();


router.post("/register", dataValidator(createUpdateUserSchema), register);

router.post("/login", dataValidator(loginSchema), login);

router.get("/verify", dataValidator(verifyEmailSchema), verifyUser);

router.get("/all", authenticateUser, getAll);

router.get("/:id", authenticateUser, getId);

router.put(
  "/edit/:id",
  [authenticateUser, dataValidator(createUpdateUserSchema)],
  update
);

router.delete("/delete/:id", authenticateUser, deleteUser);

module.exports = router;
