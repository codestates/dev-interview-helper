require("dotenv").config();
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = {
  login: async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;

    // email과 password가 비어 있을 경우 해당 메시지 리턴. > Line 11 ~ 15) Front에서 다룬다하여 주석처리
    // if (!email)
    //   return res.json({ success: false, message: "이메일을 입력해주세요" });
    // if (!password)
    //   return res.json({ success: false, message: "비밀번호를 입력해주세요" });

    // email과 password가 정상적인 데이터일 경우
    try {
      const userInfo = await User.findOne({ where: { email } });
      if (!userInfo) {
        return res.json({
          success: false,
          message: "이메일 또는 비밀번호가 잘못되었습니다",
        });
      }
      const match = await bcrypt.compare(
        password,
        userInfo.dataValues.password
      );
      if (!match) {
        return res.json({
          success: false,
          message: "이메일 또는 비밀번호가 잘못되었습니다",
        });
      }

      return res
        .status(201)
        .json({ success: true, message: "로그인이 완료되었습니다" });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};