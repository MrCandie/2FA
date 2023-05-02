const Token = require("../model/token-model");
const speakeasy = require("speakeasy");

exports.generateSecret = async (req, res, next) => {
  const secretToken = speakeasy.generateSecret();

  try {
    const token = await Token.create({ secret: secretToken.base32 });

    return res.status(201).json({
      status: "success",
      message: "secret token generated",
      token: secretToken.base32,
      tokenId: token.id,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message || "something went wrong",
    });
  }
};

exports.verifyToken = async (req, res, next) => {
  const token = await Token.findById(req.params.id);
  const enteredToken = req.body.token;

  const verified = speakeasy.totp.verify({
    secret: token.secret,
    encoding: "base32",
    token: enteredToken,
  });
  if (!verified) {
    return res.status(403).json({
      message: "verification failed",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "verification successful",
    verified: verified,
  });
};
