const Poll = require("../../model/poll/pollModel")

// Create a Poll
exports.createPoll = async (req, res) => {
  const { question, options } = req.body;

  if (!question || !options || options.length < 2) {
    return res.status(400).json({ error: "Question and at least two options are required" });
  }

  try {
    const poll = new Poll({
      question,
      options: options.map((opt) => ({ option: opt })),
      createdBy: req.userId,
    });

    await poll.save();
    res.status(201).json({ message: "Poll created successfully", poll });
  } catch (error) {
    res.status(500).json({ error: "Error creating poll", details: error.message });
  }
};

// Vote on a Poll
exports.voteOnPoll = async (req, res) => {
  const { pollId } = req.params;
  const { optionIndex } = req.body; // Send option index in request body

  if (optionIndex === undefined) {
    return res.status(400).json({ error: "Option index is required" });
  }

  try {
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ error: "Invalid option index" });
    }

    poll.options[optionIndex].votes += 1;
    await poll.save();

    res.status(200).json({ message: "Vote recorded successfully", poll });
  } catch (error) {
    res.status(500).json({ error: "Error voting on poll", details: error.message });
  }
};

// Get All Polls
exports.getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find().populate("createdBy", "firstname lastname email");
    res.status(200).json({ polls });
  } catch (error) {
    res.status(500).json({ error: "Error fetching polls", details: error.message });
  }
};
