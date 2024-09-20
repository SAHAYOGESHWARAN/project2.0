const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'yourSecretKey');
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};
