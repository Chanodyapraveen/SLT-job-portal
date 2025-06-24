require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function verifyUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const User = mongoose.model('User') || mongoose.model('User', new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String
    }));
    
    // CHANGE THIS TO YOUR EMAIL
    const email = 'your-email@example.com';
    // CHANGE THIS TO YOUR PASSWORD
    const password = 'your-password';
    
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log(`❌ No user found with email: ${email}`);
      return;
    }
    
    console.log('✅ User found:');
    console.log('- Name:', user.name);
    console.log('- Email:', user.email);
    console.log('- Role:', user.role);
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch ? '✅ VALID' : '❌ INVALID');
    
    // If password doesn't match, reset it
    if (!isMatch) {
      console.log('\nResetting password...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, 10);
      
      user.password = hashedPassword;
      await user.save();
      
      console.log('Password reset complete!');
      
      // Verify the new password
      const updatedUser = await User.findOne({ email }).select('+password');
      const verifyMatch = await bcrypt.compare(password, updatedUser.password);
      console.log('New password verification:', verifyMatch ? '✅ VALID' : '❌ INVALID');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

verifyUser();