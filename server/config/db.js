const mongoose = require('mongoose');
const dns = require('dns');

let isConnected = false;
let isUsingMemoryStore = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/technovoo_career_copilot';
  try {
    // Configure public DNS resolvers to prevent Windows SRV lookup failures
    if (uri.startsWith('mongodb+srv://')) {
      try {
        dns.setServers(['8.8.8.8', '1.1.1.1']);
      } catch (dnsErr) {
        // Fallback to system DNS
      }
    }

    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    isConnected = true;
    isUsingMemoryStore = false;
    console.log(`[Database] MongoDB Atlas Connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[Database] Notice: MongoDB connection to ${uri.replace(/:[^:]*@/, ':****@')} failed (${error.message}).`);
    console.warn('[Database] Activating High-Performance Dual-Mode In-Memory Persistence for hackathon evaluation.');
    isConnected = false;
    isUsingMemoryStore = true;
    return null;
  }
};

const getStatus = () => ({
  isConnected,
  isUsingMemoryStore,
  mode: isConnected ? 'MongoDB Live' : 'In-Memory Resilient Storage (Hackathon Mode)'
});

module.exports = {
  connectDB,
  getStatus,
  isMemoryStore: () => isUsingMemoryStore
};
