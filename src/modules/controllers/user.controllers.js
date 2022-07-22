const User = require("../../DB/models/hospital/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const path = require("path");

process.env.key = "Derevyanko_Olesya";
const generateJwt = (_id, login) => {
  return jwt.sign({ _id, login }, process.env.key, {
    expiresIn: "24h",
  });
};
const parseJwt = (token) => {
  return jwt.verify(token, process.env.key);
};

module.exports.postUsers = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    res.status(420).send("Incorrect username or password");
  } else {
    const checkUser = await User.findOne({ login: login });
    if (checkUser) {
      res.status(421).send("User with this login already exists");
    } else {
      const img = "";
      const user = new User({
        login: login,
        password,
        img,
        role: "user",
      });
      user.save();
      res.send({ login, img: "", role: "user" });
    }
  }
};

module.exports.getUser = async (req, res) => {
  const { login, password } = req.body;
  const checkUser = await User.findOne({ login });
  if (!checkUser) {
    res.status(450).send("This user does not exist");
  } else {
    if (checkUser.password !== password) {
      res.status(440).send("The entered password is incorrect");
    } else {
      const { _id, login, img, role } = checkUser;
      res.send({ _id, login, img, role });
    }
  }
};

module.exports.getUserById = async (req, res) => {
  const { _id } = req.body;
  const checkUser = await User.findOne({ _id });
  if (!checkUser) {
    res.status(450).send("This user does not exist");
  } else {
    const { login, img } = checkUser;
    res.send({ login, img });
  }
};

module.exports.patchUser = async (req, res) => {
  const { headers, files } = req;
  if (headers.login && files.hasOwnProperty("img") && files.img) {
    const { img } = files;
    let end = img.name.split(".");
    end = end[end.length - 1];
    let fileName = uuid.v4() + "." + end;
    img.mv(path.resolve(__dirname, "../../source/images", fileName));
    fileName = "http://localhost:8080/" + fileName;
    User.updateOne({ login: headers.login }, { img: fileName }).then(
      (result) => {
        res.send(fileName);
      }
    );
  } else {
    res.status(411).send("User not found or image not selected");
  }
};
