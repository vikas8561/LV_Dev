const express = require('express');
const router = express.Router();

// Simple API route that redirects to default route
router.get('/', (req, res) => {
  res.redirect('/');
});

// Alternative API route
router.get('/home', (req, res) => {
  res.redirect('/');
});

// API info route
router.get('/info', (req, res) => {
  res.json({
    message: 'Legacy Vogue API',
    redirect: 'This API redirects to the default route /',
    endpoints: {
      'GET /api': 'Redirects to /',
      'GET /api/home': 'Redirects to /',
      'GET /api/info': 'Shows API information'
    }
  });
});

module.exports = router;
