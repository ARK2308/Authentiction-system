const express = require("express");
const {
  createPoll,
  voteOnPoll,
  getAllPolls,
} = require("../../controllers/poll/pollControllers");
const userauthenticate = require("../../middleware/user/userauthenticate");

const router = express.Router();

router.post("/create", userauthenticate, createPoll);
router.post("/vote/:pollId", userauthenticate, voteOnPoll);
router.get("/all", userauthenticate, getAllPolls);

module.exports = router;
