const User = require("../models/user");
const Credential = require("../models/credential");
const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;

class SignupController {
  static async Execute(req, res) {
    console.log(req.body);
    const {
      firstName,
      lastName,
      email,
      mobile,
      dialCode,
      isVerified,
      role,
      password,
      confirmPassword,
    } = req.body;

    console.log(req.body);
    const user = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      isVerified: isVerified,
      dialCode: dialCode,
      role: role.trim(),
    });

    const existingUser = await User.find({
      email: email,
    });

    if (existingUser.length > 0) {
      res.status(400).json({
        message: `Email Address is already registered`,
      });
    } else {
      user.save(async (err, response) => {
        if (err) {
          return res.status(400).send(err, response);
        } else {
          if (password === confirmPassword) {
            bcrypt.hash(password, saltRounds).then(async function (hash) {
              // Store hash in your password DB.
              const credential = new Credential({
                user: response._id,
                email: response.email.trim(),
                password: hash,
                role: "client",
                OTP: password,
              });

              credential.save((err) => {
                if (err) {
                  return res.status(400).send(err);
                } else {
                  res.status(200).json({
                    message: `user added sucessfully`,
                  });
                }
              });
            });
          } else {
            res.status(400).json({
              message: `Password does not match`,
            });
          }
        }
      });
    }
  }
}

module.exports = SignupController;
