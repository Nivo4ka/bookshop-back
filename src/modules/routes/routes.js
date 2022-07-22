const express = require("express");
const router = express.Router();

const {
  postBook,
  patchBook,
  patchBookImg,
  delBook,
  getBooks,
  getBooksBygenre,
  getBook,
  searchBooks,
  patchBookDown,
} = require("../controllers/book.controllers.js");

router.post("/book/get", getBooks);
router.post("/book/getBooksBygenre", getBooksBygenre);
router.post("/book/getBooks", getBook);
router.post("/book/searchBooks", searchBooks);
router.post("/book/post", postBook);
router.patch("/book/patch", patchBook);
router.patch("/book/patchimg", patchBookImg);
router.patch("/book/patchdown", patchBookDown);
router.delete("/book/del", delBook);

const {
  getUser,
  getUserById,
  postUsers,
  patchUser,
} = require("../controllers/user.controllers.js");

router.post("/user/get", getUser);
router.post("/user/getUserById", getUserById);
router.post("/user/post", postUsers);
router.patch("/user/patch", patchUser);

const {
  postReview,
  // patchReview,
  delReview,
  getReviews,
} = require("../controllers/review.controllers.js");

router.post("/review/get", getReviews);
router.post("/review/post", postReview);
// router.patch("/review/patch", patchReview);
router.delete("/review/del", delReview);

module.exports = router;
