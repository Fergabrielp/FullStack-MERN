import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationExpress } from "../middlewares/validationExpress.js";

const router = Router();

router.post(
  "/register",
  [
    body("email", "Incorrect email format").trim().isEmail().normalizeEmail(),
    body("password", "Minimum 6 characters").trim().isLength({ min: 6 }),
    body("password", "Incorrect format password").custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("Try again, password incorrect");
      }
      return value;
    }),
  ],
  validationExpress,
  register
);
router.post(
  "/login",
  [
    body("email", "Incorrect email format").trim().isEmail().normalizeEmail(),
    body("password", "Incorrect password format").trim().isLength({ min: 6 }),
  ],
  validationExpress,
  login
);

export default router;
