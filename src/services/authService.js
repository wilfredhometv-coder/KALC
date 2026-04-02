const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const secretKey = 'your_secret_key'; // Change this to your actual secret

// User registration function
async function registerUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    // Save user data with hashed password to the database
    return { ...userData, password: hashedPassword };
}

// User login function
async function loginUser(userData) {
    // Retrieve stored hashed password from the database and compare
    const isMatch = await bcrypt.compare(userData.password, storedHashedPassword);
    if (!isMatch) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: userData.id }, secretKey, { expiresIn: '1h' });
    return token;
}

// Token generation function
function generateToken(user) {
    return jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
}

// Password hashing function
async function hashPassword(password) {
    return await bcrypt.hash(password, saltRounds);
}

module.exports = { registerUser, loginUser, generateToken, hashPassword };