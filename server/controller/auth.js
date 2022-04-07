const { User } = require("../models");
const { checkAccessToken } = require("./functions/jwtToken");

module.exports = async (req, res) => {
  try {
    // 쿠키에 에세스 토큰이 존재.
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(401).json({ message: "Access token not provided!" });
    }

    // 에세스 토큰이 유효한지 확인.
    const accessTokenData = checkAccessToken(accessToken);
    if (!accessTokenData) {
      return res.status(401).json({ message: "Invalid token!" });
    }

    // 에세스 토큰 정보 확인.
    const { email } = accessTokenData;
    const userInfo = await User.findOne({ where: { email } });
    if (!userInfo) {
      return res.status(403).json({ message: "Not authorized!" });
    }

    // 에세스 유효하거나 권한이 있는 경우 사용자 정보를 리턴한다.
    res.status(200).json({ userInfo });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error!" });
  }
};
