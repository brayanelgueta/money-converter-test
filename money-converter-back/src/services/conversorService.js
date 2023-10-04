const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const History = require("../models/history");

const getHistory = async (req, res) => {
  res.send(await History.find().sort({ createdAt: -1 }));
};

const getConvertion = async (req, res) => {
  try {
    const { value, date } = req.body;

    const response = await axios.get(`https://mindicador.cl/api/uf/${date}`);

    const newValue = value * response.data.serie[0].valor;

    const cookie = req.cookies["refresh_token"];

    const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);

    if (!claims) {
      return res.status(401).send({ message: "unauthenticated" });
    }

    const user = await User.findOne({ _id: claims._id });

    const register = new History({
      user: user.username,
      originValue: value,
      convertionDate: date,
      moneyValue: response.data.serie[0].valor,
      convertionValue: Math.ceil(newValue),
    });
  
     await register.save();

     const result = {
        value: value,
        date: date,
        moneyValue: response.data.serie[0].valor,
        totalAmount: Math.ceil(newValue)
     }
    res.send(result);
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: e });
  }
};

module.exports = { getHistory, getConvertion };
