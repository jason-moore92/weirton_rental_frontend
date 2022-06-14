const User = require("../models/user.model");

exports.loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        console.log(req.body.email);
        const password = req.body.password;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).json({
                error: "Login failed! Check authentication credentials",
            });
        }
        const token = await user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(400).json({ err: err });
    }
};
exports.getUserDetails = async (req, res) => {
    await res.json(req.userData);
};
