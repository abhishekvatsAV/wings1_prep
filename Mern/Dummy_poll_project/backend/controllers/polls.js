const Poll = require("../models/poll");

const handleGetAll = async (req, res) => {
  try {
    const polls = await Poll.find();
    return res.status(200).json(polls);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const handleCreate = async (req, res) => {
  const { question, option1, option2, option3, option4 } = req.body;

  if (!question.trim() || !option1.trim() || !option2.trim() || !option3.trim() || !option4.trim()) {
    return res.status(403).json({ error: "All options and question must not be empty!" });
  }

  const options = [option1, option2, option3, option4].map((option) => option.trim());

  if (new Set(options).size !== 4) {
    return res.status(403).json({ error: "Option should be different" });
  }

  try {
    await Poll.deleteMany({});
    const poll = await Poll.create({ question, option1, option2, option3, option4 });
    return res.status(201).json({ message: "Poll is created successfully" });
  } catch (error) {
    return res.status(400).json({ error: `Unable to create a new poll due to ${error.message}` });
  }
};

const handleUpdate = async (req, res) => {
  const { selectedOption } = req.body;

  try {
    const poll = await Poll.findOne();
    if (selectedOption === "option1") {
      poll.option1Votes += 1;
    } else if (selectedOption === "option2") {
      poll.option2Votes += 1;
    } else if (selectedOption === "option3") {
      poll.option3Votes += 1;
    } else {
      poll.option4Votes += 1;
    }

    const total = poll.option1Votes + poll.option2Votes + poll.option3Votes + poll.option4Votes;

    poll.option1Percentage = 100 * (poll.option1Votes / total);
    poll.option2Percentage = 100 * (poll.option2Votes / total);
    poll.option3Percentage = 100 * (poll.option3Votes / total);
    poll.option4Percentage = 100 * (poll.option4Votes / total);

    await poll.save();
    return res.status(200).json({ message: "Added the vote successfully", poll });
  } catch (error) {
    return res.status(400).json({ error: `Unable to add this vote due to ${error}` });
  }
};

module.exports = { handleCreate, handleGetAll, handleUpdate };
