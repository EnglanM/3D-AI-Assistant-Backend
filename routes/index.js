const express = require('express');
const router = express.Router();
const textToSpeech = require('../helpers/tts');
const runChatbot = require('../helpers/chatBot');  

require('dotenv').config();

/* GET home page. */
router.post('/talk', function(req, res, next) {
  textToSpeech(req.body.text, req.body.voice)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json({});
    });
});

router.get('/', function(req, res) {
  res.send('hello world!');
});

router.post('/testChatbot', async function(req, res) {
  try {
    const result = await runChatbot(req.body.message);
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message || 'Internal Server Error');
  }
});

module.exports = router;
