const Review = require("../../DB/models/hospital/reviews");
const jwt = require("jsonwebtoken");
const reviews = require("../../DB/models/hospital/reviews");

process.env.key = "Derevyanko_Olesya";
const parseJwt = (token) => {
  return jwt.verify(token, process.env.key);
};

module.exports.getReviews = (req, res) => {
  const { body } = req;
  Review.find({ idBook: body._id }).then((result) => {
    res.send({ reviews: result });
  });
};

module.exports.delReview = async (req, res) => {
  const { query } = req;
  if (query.id) {
    Review.deleteOne({ _id: query.id }).then((result) => res.send("OK"));
  } else {
    res
      .status(441)
      .send("Delete error, it is not known which record to delete");
  }
};

module.exports.postReview = async (req, res) => {
  const { body } = req;
  const value = new Review({
    idUser: body.idUser,
    idBook: body.idBook,
    review: body.review,
    rating: body.rating,
  });

  if (body.idUser && body.idBook && (body.review || body.rating)) {
    value.save();
    res.send("OK");
  } else {
    res
      .status(420)
      .send("Appointment creation error, not all fields are filled");
  }
};

// module.exports.patchReview = async (req, res) => {
//   const { body } = req;

//   if (body._id) {
//     if (
//       body.name &&
//     body.autor &&
//     body.countEstim &&
//     body.description &&
//     body.countDownl &&
//     body.genre &&
//     body.img
//     ) {
//       Book.updateOne({ _id: body._id }, body)
//         .then((result) => res.send("OK"))
//         .catch((err) => res.send(err));
//     } else {
//       res
//         .status(420)
//         .send("Error changes, changed parameters were not transferred");
//     }
//   } else {
//     res
//       .status(425)
//       .send(
//         "Error of change, the parameters of which record need to be changed is unknown"
//       );
//   }
// };
