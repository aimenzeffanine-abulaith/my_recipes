const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT);
        req.currentUser = decoded;
        next();
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    isLoggedIn
};