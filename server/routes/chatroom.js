const express = require('express');
const router = express.Router();
const Chatroom = require('../models/chatroom');
const Message = require('../models/message');
const User = require('../models/user');

// create a new chatroom
router.post('/new', async (req, res) => {
  const { name, users } = req.body;

  try {
    const chatroom = new Chatroom({
      name,
      users
    });

    await chatroom.save();
    res.status(201).json(chatroom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// get all chatroom
router.get('/', async (req, res) => {
  try {
    const chatrooms = await Chatroom.find().populate('users', 'username');
    res.status(200).json(chatrooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// get a chatroom by id
router.get('/:id', async (req, res) => {
  try {
    const chatroom = await Chatroom.findById(req.params.id).populate('users', 'username').populate({
      path: 'messages',
      populate: {
        path: 'userId',
        select: 'username'
      }
    });

    if (!chatroom) {
      return res.status(404).json({ msg: 'Chatroom not found' });
    }

    res.status(200).json(chatroom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// delete a chatroom by id
router.delete('/:id', async (req, res) => {
  try {
    const chatroom = await Chatroom.findById(req.params.id);

    if (!chatroom) {
      return res.status(404).json({ msg: 'Chatroom not found' });
    }

    await chatroom.remove();
    res.status(200).json({ msg: 'Chatroom deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;