const Book = require("../../DB/models/hospital/books");
const jwt = require("jsonwebtoken");
const books = require("../../DB/models/hospital/books");
const uuid = require("uuid");
const path = require("path");

process.env.key = "Derevyanko_Olesya";
const parseJwt = (token) => {
  return jwt.verify(token, process.env.key);
};

module.exports.getBooks = (req, res) => {
  const { body } = req;
  Book.findOne({ _id: body.id })
    .then((result) => {
      res.send({ book: result });
    })
    .catch((err) => console.log(err));
};

module.exports.getBooksBygenre = (req, res) => {
  Book.find({ genre: req.body.genre })
    .then((result) => {
      res.send({ books: result });
    })
    .catch((err) => console.log(err));
};

module.exports.getBook = (req, res) => {
  const { body } = req;
  if (body.down) {
    Book.find({})
      .sort({ countDownl: +body.down })
      .then((result) => {
        res.send({ books: result });
      })
      .catch((err) => console.log(err));
  } else if (body.type) {
    Book.find({ type: body.type })
      .then((result) => {
        res.send({ books: result });
      })
      .catch((err) => console.log(err));
  } else if (body.rating) {
    Book.find({})
      .sort({ rating: +body.rating })
      .then((result) => {
        res.send({ books: result });
      })
      .catch((err) => console.log(err));
  } else {
    Book.find({})
      .then((result) => {
        res.send({ books: result });
      })
      .catch((err) => console.log(err));
  }
};

module.exports.searchBooks = (req, res) => {
  const { body } = req;
  Book.find({ name: { $regex: body.s, $options: "i" } })
    .then((result) => {
      res.send({ books: result });
    })
    .catch((err) => res.send(err));
};

module.exports.delBook = async (req, res) => {
  const { query } = req;
  if (query.id) {
    Book.deleteOne({ _id: query.id }).then((result) => res.send("OK"));
  } else {
    res
      .status(441)
      .send("Delete error, it is not known which record to delete");
  }
};

module.exports.postBook = async (req, res) => {
  const { body } = req;

  const value = new Book(body);
  // value.img = "";
  value.save().then((result) => {
    res.send(result._id);
  });
};

module.exports.patchBook = async (req, res) => {
  const { body } = req;
  const { name, autor, description, genre, type } = body;
  if (body.id) {
    Book.updateOne({ _id: body.id }, { name, autor, description, genre, type })
      .then((result) => res.send("OK"))
      .catch((err) => res.send(err));
  } else {
    res
      .status(425)
      .send(
        "Error of change, the parameters of which record need to be changed is unknown"
      );
  }
};

module.exports.patchBookImg = async (req, res) => {
  const { headers, files } = req;
  const { img } = files;
  let end = img.name.split(".");
  end = end[end.length - 1];
  let fileName = uuid.v4() + "." + end;
  img.mv(path.resolve(__dirname, "../../source/images", fileName));
  fileName = "http://localhost:8080/" + fileName;
  if (headers.id) {
    Book.updateOne({ _id: headers.id }, { img: fileName })
      .then((result) => res.send("OK"))
      .catch((err) => res.send(err));
  } else {
    res
      .status(425)
      .send(
        "Error of change, the parameters of which record need to be changed is unknown"
      );
  }
};

module.exports.patchBookDown = async (req, res) => {
  const { body } = req;
  if (body.id) {
    Book.findOne({ _id: body.id }, ["countDownl"]).then((result) => {
      let count = result.countDownl;
      count++;
      Book.updateOne({ _id: body.id }, { countDownl: count })
        .then((resul) => res.send("OK"))
        .catch((err) => res.send(err));
    });
  } else {
    res
      .status(425)
      .send(
        "Error of change, the parameters of which record need to be changed is unknown"
      );
  }
};
