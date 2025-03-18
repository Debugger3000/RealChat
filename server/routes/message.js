const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const Chatroom = require('../models/chatroom');
const User = require('../models/user');

// create a new message
router.post('/new', async (req, res) => {
  const { chatroomId, userId, content } = req.body;

  try {
    const chatroom = await Chatroom.findById(chatroomId);
    const user = await User.findById(userId);

    if (!chatroom || !user) {
      return res.status(404).json({ msg: 'Chatroom or User not found' });
    }

    const newMessage = new Message({
      chatroomId,
      userId,
      content
    });

    await newMessage.save();

    // add the message to the chatroom's messages array
    chatroom.messages.push(newMessage._id);
    await chatroom.save();

    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// get all messages for a chatroom
router.get('/chatroom/:chatroomId', async (req, res) => {
  try {
    const messages = await Message.find({ chatroomId: req.params.chatroomId }).populate('userId', 'username');
    res.status(200).json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// delete a message by id
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ msg: 'Message not found' });
    }

    await message.remove();
    res.status(200).json({ msg: 'Message deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;