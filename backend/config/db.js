const mongoose = require('mongoose');

// Handle deprecation warning
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 
      'mongodb+srv://chanodyapraveen:10UdfXJSOyLED4Hl@cluster0.xofnz7b.mongodb.net/chanodyapraveen?retryWrites=true&w=majority&appName=Cluster0';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;