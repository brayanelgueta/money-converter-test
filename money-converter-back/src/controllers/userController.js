const userService = require("../services/userService");

const register = (req, res) => {
  return userService.register(req, res);
};

const login = (req, res) => {
  return userService.login(req, res);
};

const getUser = (req, res) => {
  return userService.getUser(req, res);
};

const logout = (req, res) => {
  return userService.logout(req, res);
};

const refresh = (req,res) => {
  return userService.refresh(req,res)
}
module.exports = {
  register,
  login,
  getUser,
  logout,
  refresh
};
