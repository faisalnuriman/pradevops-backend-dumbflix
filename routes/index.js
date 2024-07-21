const express = require("express");
const router = express.Router();

const { upload } = require("../middleware/uploadImage");

const { auth, authAdmin } = require("../middleware/auth");

const { login, register, cekAuth } = require("../controllers/auth");

const { getUser, deleteUser } = require("../controllers/user");

const {
  getFilm,
  getDetailFilm,
  addFilm,
  editFilm,
  deleteFilm,
} = require("../controllers/film");

const {
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/category");

const {
  addTransaction,
  getTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transaction");

const {
  addEpisode,
  getEpisodesByFilm,
  getDetailEpisode,
  editEpisode,
  deleteEpisode,
} = require("../controllers/episode");

// Authentication Routes
router.post("/register", register);
router.post("/login", login);
router.get("/auth", auth, cekAuth);

// User Routes
router.get("/user", auth, authAdmin, getUser);
router.delete("/user/:id", auth, authAdmin, deleteUser);

// Film Routes
router.get("/film", getFilm);
router.get("/film/:id", getDetailFilm);
router.post("/film", auth, authAdmin, upload("thumbnailFilm"), addFilm);
router.patch("/film/:id", auth, authAdmin, editFilm);
router.delete("/film/:id", auth, authAdmin, deleteFilm);

// Category Routes
router.get("/category", getCategory);
router.post("/category", auth, authAdmin, addCategory);
router.patch("/category/:id", auth, authAdmin, editCategory);
router.delete("/category/:id", auth, authAdmin, deleteCategory);

// Transcation Routes
router.get("/transaction", getTransaction);
router.post("/transaction", auth, upload("attache"), addTransaction);
router.patch("/transaction/:id", auth, authAdmin, editTransaction);
router.delete("/transaction/:id", auth, authAdmin, deleteTransaction);

// Episode Routes
router.post("/episode", auth, authAdmin, upload("thumbnailFilm"), addEpisode);
router.get("/film/:id/episodes", auth, authAdmin, getEpisodesByFilm);
router.get("/episodes/:idEpisode", auth, authAdmin, getDetailEpisode);
router.patch("/episode/:id", auth, authAdmin, editEpisode);
router.delete("/episode/:id", auth, authAdmin, deleteEpisode);

router.get("*", function (req, res) {
  res.status(404).send({
    error: "404 Not Found",
  });
});

module.exports = router;
