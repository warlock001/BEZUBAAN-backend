const SignupRouter = require("express").Router();
const { body, check, query, validationResult } = require("express-validator");

const SignupController = require("../controllers/SignupController");

SignupRouter.post(
    "/signup",
    body("password").custom((value, { req }) => {
        if (
            value == req.body.email ||
            value == req.body.firstName ||
            value == req.body.lastName
        ) {
            throw new Error("Password cannot be same as email or name");
        }

        return true;
    }),
    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password confirmation does not match password");
        }

        return true;
    }),
    body("firstName").isAlpha().withMessage({
        message: "Not a name",
        errorCode: 400,
    }),
    body("lastName").isAlpha().withMessage({
        message: "Not a name",
        errorCode: 400,
    }),
    body("email").isEmail().withMessage({
        message: "Not an email",
        errorCode: 400,
    }),
    check("password", "The password must be 8+ chars long and contain a number")
        .not()
        .isIn(["123", "password", "god"])
        .withMessage("Do not use a common word as the password")
        .isLength({ min: 8 })
        .matches(/\d/),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            SignupController.Execute(req, res);
        }
    }
);

module.exports = SignupRouter;
