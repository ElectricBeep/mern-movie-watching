const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

//UPDATE
router.put("/:id", verify, async (req, res) => {
    //If you are trying to update your own account or you are admin
    if (req.user.id === req.params.id || req.user.isAdmin) {
        //If update request contains requset to change a password
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString();
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true }); //So it returns user with updated properties
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        };
    } else {
        res.status(403).json("You can update only your account!");
    }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {

        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted!");
        } catch (err) {
            res.status(500).json(err);
        };
    } else {
        res.status(403).json("You can delete only your account!");
    };
});

//GET USER
router.get("/find/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (err) {
        res.status(500).json(err);
    };
});

//GET ALL USERS
router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            //If there is query limit return to 10 users, if there is no query, return all users
            const users = query ? await User.find().sort({ _id: - 1 }).limit(5) : await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        };
    } else {
        res.status(403).json("You not authenticated");
    };
});

//GET USER STATS
//We get number of registrated users per month
router.get("/stats", verify, async (req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1); //Gives back a year before

    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" } //For january it returns 1, for february, 2 ...
                }
            }, {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;