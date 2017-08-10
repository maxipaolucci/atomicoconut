const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  res.render('home', {title: 'Home'});
});

router.get('/data', (req, res) => {
  res.json({ here : 'data'});
});

module.exports = router;
