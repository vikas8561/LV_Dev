const mongoose = require('mongoose');

// Database configuration
const dbConfig = {
  // MongoDB connection options
  options: {
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    bufferCommands: false, // Disable mongoose buffering
  },

  // Connection strings for different environments
  uris: {
    development: process.env.MONGO_URI || 'mongodb://localhost:27017/legacy-vogue-dev',
    production: process.env.MONGO_URI || 'mongodb+srv://legaacyvogue_db_user:KcUP9JrplMLVIlIH@legacyvogue.un9yjib.mongodb.net/',
    test: process.env.MONGO_TEST_URI || 'mongodb://localhost:27017/legacy-vogue-test'
  },

  // Get connection URI based on environment
  getConnectionUri: function() {
    const env = process.env.NODE_ENV || 'development';
    return this.uris[env] || this.uris.development;
  },

  // Connect to MongoDB
  connect: async function() {
    try {
      const uri = this.getConnectionUri();
      const options = this.options;
      
      console.log(`🔗 Connecting to MongoDB...`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🗄️  Database: ${uri.split('/').pop()}`);
      
      const connection = await mongoose.connect(uri, options);
      
      console.log(`✅ MongoDB Connected Successfully!`);

      
      return connection;
    } catch (error) {
      console.error(`❌ MongoDB Connection Error:`, error.message);
      console.error(`🔧 Please check your MongoDB connection settings`);
      
      // Graceful shutdown on connection error
      process.exit(1);
    }
  },

  // Disconnect from MongoDB
  disconnect: async function() {
    try {
      await mongoose.disconnect();
      console.log(`🔌 MongoDB Disconnected Successfully!`);
    } catch (error) {
      console.error(`❌ MongoDB Disconnection Error:`, error.message);
    }
  },

  // Get connection status
  getStatus: function() {
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    return {
      state: states[mongoose.connection.readyState],
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      name: mongoose.connection.name,
      readyState: mongoose.connection.readyState
    };
  },

  // Handle connection events
  setupEventHandlers: function() {
    mongoose.connection.on('connected', () => {
      console.log(`🟢 MongoDB Connected: ${mongoose.connection.host}:${mongoose.connection.port}`);
    });

    mongoose.connection.on('error', (err) => {
      console.error(`🔴 MongoDB Connection Error:`, err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log(`🟡 MongoDB Disconnected`);
    });

    // Handle application termination
    process.on('SIGINT', async () => {
      await this.disconnect();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await this.disconnect();
      process.exit(0);
    });
  }
};

module.exports = dbConfig;
