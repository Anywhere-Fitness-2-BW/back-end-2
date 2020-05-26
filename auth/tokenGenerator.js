const jwt = require('jsonwebtoken');

module.exports = (user, role) => {
    const payload = {
        userId: user.id,
        role
    };
    const secret = process.env.JWT_SECRET || 'This is my precious!';
    const options = {
        expiresIn: '2h'
    }
    return jwt.sign(payload, secret, options);
}