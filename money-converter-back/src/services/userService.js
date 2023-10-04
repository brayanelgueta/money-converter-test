const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const userExists = await User.exists({username: req.body.username}).exec()

  if(userExists) return res.send({
    status: 409,
    message: 'Usuario ya existe'
  })

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    userType: "user",
  });

  const result = await user.save();

  const { password, ...data } = await result.toJSON();

  res.send({
    status: '201',
    data
  });
};

const login = async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });

  if (!user) {
    return res.send({ 
      status: 404,
      message: "User not found" });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.send({ status: 400, message: "Invalid Credentials" });
  }

  //secret deberia estar en el .env
  const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);
  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.REFRESH_TOKEN_SECRET
  );

  user.refresh_token = refreshToken;

  await user.save();

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.send({
    status: '200',
    access_token: token,
    user: user.username,
    userType: user.userType
  });
};

const getUser = async (req, res) => {
  try {
    const cookie = req.cookies["refresh_token"];

    const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);

    if (!claims) {
      return res.status(401).send({ message: "unauthenticated" });
    }

    const user = await User.findOne({ _id: claims._id });

    const { password, ...data } = user.toJSON();
    res.send(data);
  } catch (e) {
    return res.status(401).send({ message: "unauthenticated" });
  }
};

const logout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.refresh_token) return res.sendStatus(204);

  const refreshToken = cookies.refresh_token;
  const user = await User.findOne({ refresh_token: refreshToken }).exec();

  if (!user) {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }

  user.refresh_token = null;
  await user.save();

  res.clearCookie("refresh_token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
};

async function refresh(req, res) {
  const cookies = req.cookies;
  if (!cookies.refresh_token) return res.sendStatus(401);

  const refreshToken = cookies.refresh_token;

  const user = await User.findOne({ refresh_token: refreshToken }).exec();
  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.id !== decoded._id) return res.sendStatus(403);

    const accessToken = jwt.sign(
      { id: decoded._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1800s" }
    );

    res.json({ access_token: accessToken });
  });
}
module.exports = {
  register,
  login,
  getUser,
  logout,
  refresh,
};
