const User = require('../Models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const user = await User.create({ ...req.body });

        const token = jwt.sign(
            { userId: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_LIFETIME }
        );

        res.status(201).json({ user: { name: user.name }, token });
    } catch (error) {
        res.status(500).json({ msg: 'Registration failed', error });
        console.log(error);

    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'Please provide email and password' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: 'Invalid Credentials' });
            console.log(error)
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ msg: 'Invalid Credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_LIFETIME }
        );

        res.status(200).json({ user: { name: user.name }, token });
    } catch (error) {
        res.status(500).json({ msg: 'Login failed', error });
    }
};

module.exports = { register, login };