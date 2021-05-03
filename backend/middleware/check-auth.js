const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log("token checking");
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    jwt.verify(token, 'my_secret_pk_panda_is_cute');
    console.log("token checked");
    next();
  } catch (err) {
    res.status(401).json({ message: "Auth failed!" });
  }

};
