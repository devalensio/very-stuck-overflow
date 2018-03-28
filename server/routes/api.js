var express = require('express');
var router = express.Router();
const { addQuestion,showQuestion,showOne,upVote,showVote,downVote } = require('../controllers/question')
const { addAnswer,showAnswer } = require('../controllers/answer')

/* GET users listing. */
router.post('/question', addQuestion);
router.get('/question', showQuestion);
router.get('/question/:id', showOne);
router.post('/answer', addAnswer);
router.get('/answer', showAnswer);
router.post('/votequestion', upVote);
router.get('/votequestions', showVote);
router.get('/votequestiondown', downVote);

module.exports = router;
