const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  res.render('home', {title: 'Home'});
});

//Angular App urls
router.get('/app', (req, res) => {
  res.render('home', {title: 'Home'});
});
router.get('/app/investments', (req, res) => {
  res.render('home', {title: 'Investements'});
});

router.get('/data', (req, res) => {
  res.json({ here : 'data'});
});

module.exports = router;
