const jwtManager = require('./jwt');

// Fake user data
const user = {
  id: 1,
  username: 'student',
  role: 'user'
};

// Tạo token
const token = jwtManager.generateToken(user);
console.log('\n🔐 Generated Token:\n', token);

// Verify token
const verified = jwtManager.verifyToken(token);
console.log('\n✅ Verified Payload:\n', verified);

// Decode token
const decoded = jwtManager.decodeToken(token);
console.log('\n📦 Decoded Payload:\n', decoded);
