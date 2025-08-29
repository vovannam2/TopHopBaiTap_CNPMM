require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const createUserService = async (name, email, password) => {
  try {
    // check user exist
    const user = await User.findOne({ email });
    if (user) {
      console.log(`>>> user exist, chọn 1 email khác: ${email}`);
      return null;
    }

    // hash user password
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // save user to database
    let result = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: "User"
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const loginService = async (email, password) => {
  try {
    // fetch user by email
    const user = await User.findOne({ email });
    if (!user) {
      return {
        EC: 2,
        EM: "Email/Password không hợp lệ"
      };
    }

    // compare password
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return {
        EC: 2,
        EM: "Email/Password không hợp lệ"
      };
    }

    // create an access token
    const payload = {
      email: user.email,
      name: user.name
    };

    const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "5m"
    });

    return {
      EC: 0,
      EM: "Đăng nhập thành công",
      access_token,
      user: {
        email: user.email,
        name: user.name
      }
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: "Server error"
    };
  }
};

const getUserService = async () => {
  try {
    let result = await User.find({}).select("-password");
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createUserService,
  loginService,
  getUserService
};
