require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    //  Access token으로 sign
    return jwt.sign(data, process.env.ACCESS_SECRET, { expiresIn: "12h" });
  },
  sendAccessToken: (res, accessToken) => {
    // JWT 토큰을 쿠키로 전달
    const cookieOptions = {
      maxAge: 900000,
      httpOnly: true,
    };
    res.cookie("accessToken", accessToken, cookieOptions);
  },
  checkAccessToken: (accessToken) => {
    // JWT 토큰 정보를 받아서 검증
    try {
      return jwt.verify(accessToken, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
};
