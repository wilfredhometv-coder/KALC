# KALC POS System

## Project Structure
```
KALC/
├── config/
│   ├── config.js
│   ├── db.js
│   └── middleware.js
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── posController.js
│   ├── models/
│   │   ├── userModel.js
│   │   └── transactionModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── posRoutes.js
│   ├── services/
│   │   ├── authService.js
│   │   └── posService.js
│   ├── utils/
│   │   └── helpers.js
│   └── app.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Database Schema
- Users Table
  - id: UUID
  - username: String
  - password: String (hashed)
  - role: String

- Transactions Table
  - id: UUID
  - userId: UUID
  - amount: Decimal
  - date: DateTime

## Authentication
- JWT for securing endpoints.
- Passwords stored as hashes (bcrypt).

## Security Middleware
- Helmet for securing HTTP headers.
- Rate limiter to prevent abuse.

## Configuration Files
**config/config.js**
```javascript
module.exports = {
    dbURL: process.env.DB_URL,
    port: process.env.PORT || 3000,
};
```

**config/db.js**
```javascript
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose;
```

**config/middleware.js**
```javascript
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});

module.exports = { limiter, helmet };
```

## Required Packages
- express
- mongoose
- dotenv
- jsonwebtoken
- bcrypt
- helmet
- express-rate-limit
