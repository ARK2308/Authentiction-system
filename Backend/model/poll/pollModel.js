const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        option: { type: String, required: true },
        votes: { type: Number, default: 0 },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usersDbs",
      required: true,
    },
    expiresAt: {
      type: Date, // Poll expiration time
      required: true,
    },
    voters: [
      {
        type: mongoose.Schema.Types.ObjectId, // Track users who voted
        ref: "usersDbs",
      },
    ],
  },
  { timestamps: true }
);

// Automatically remove expired polls
pollSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Poll = mongoose.model("Poll", pollSchema);

module.exports = Poll;
