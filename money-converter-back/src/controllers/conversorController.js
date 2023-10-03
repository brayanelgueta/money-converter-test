const conversorService = require("../services/conversorService");

const getConvertion = (req, res) => {
  return conversorService.getConvertion(req, res);
};

const getHistory = (req, res) => {
  return conversorService.getHistory(req, res);
};

module.exports = {getConvertion, getHistory};
