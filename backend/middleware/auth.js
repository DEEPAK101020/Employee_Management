const jwt = require('jsonwebtoken');
const { BlackListModel } = require("../model/blocklist.model")
require("dotenv").config()

const auth = async (req, res, next) => {
    const access_token = req.headers.authorization?.split(" ")[1];

    if (!access_token) {
        return res.status(401).json({ msg: 'No token provided' });
    }

    //blacklisted
    const Blacklisted = await BlackListModel.findOne({ access_token });
    if (Blacklisted) {
        return res.status(401).json({ msg: 'Token is blacklisted' });
    }
    try {
        const secret_key = process.env.secret_key
        const decoded = jwt.verify(access_token, secret_key);

        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = {
    auth
}