// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Import database configuration
const dbConfig = require('./config/db.config');

// Import routes
const apiRoutes = require('./routes/api');

dotenv.config();
const app = express();

// CORS configuration for multiple domains
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'https://legacyvogue.com',
  'https://www.legacyvogue.com',
  'https://legacyvogue.in',
  'https://www.legacyvogue.in',
  'http://legacyvogue.com',
  'http://www.legacyvogue.com',
  'http://legacyvogue.in',
  'http://www.legacyvogue.in'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Domain middleware to handle different domain variations
app.use((req, res, next) => {
  const host = req.get('host');
  const protocol = req.protocol;
  
  // Log domain access
  console.log(`🌐 Request from: ${protocol}://${host}${req.path}`);
  
  // Set domain-specific headers
  res.setHeader('X-Domain', host);
  res.setHeader('X-Protocol', protocol);
  
  next();
});

// Domain-specific redirects
app.get('/domain-redirect', (req, res) => {
  const host = req.get('host');
  const protocol = req.protocol;
  
  // Redirect to the main domain based on the current domain
  if (host.includes('legacyvogue.in')) {
    res.redirect(`${protocol}://www.legacyvogue.in/`);
  } else if (host.includes('legacyvogue.com')) {
    res.redirect(`${protocol}://www.legacyvogue.com/`);
  } else {
    res.redirect('/');
  }
});

// Redirect route - redirects to default route
app.get('/redirect', (req, res) => {
  res.redirect('/');
});

// Default route
app.get('/', (req, res) => {
  const host = req.get('host');
  const protocol = req.protocol;
  
  res.json({
    message: 'Legacy Vogue API is running successfully!',
    status: 'active',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    domain: {
      current: `${protocol}://${host}`,
      supported: [
        'https://www.legacyvogue.com',
        'https://www.legacyvogue.in',
        'https://legacyvogue.com',
        'https://legacyvogue.in',
        'http://localhost:3000',
        'http://localhost:5000'
      ]
    }
  });
});

// API Routes
app.use('/api', apiRoutes);

// 404 handler
app.use((req, res) => {
  const host = req.get('host');
  const protocol = req.protocol;
  
  res.status(404).json({
    message: 'Route not found',
    currentDomain: `${protocol}://${host}`,
    availableRoutes: [
      'GET /',
      'GET /api',
      'GET /api/home',
      'GET /api/info',
      'GET /redirect',
      'GET /domain-redirect'
    ],
    supportedDomains: [
      'https://www.legacyvogue.com',
      'https://www.legacyvogue.in',
      'https://legacyvogue.com',
      'https://legacyvogue.in',
      'http://localhost:3000',
      'http://localhost:5000'
    ]
  });
});

// Setup database event handlers
dbConfig.setupEventHandlers();

// Connect to MongoDB
dbConfig.connect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀Legacy Vogue API Server running on port ${PORT}`);
});
