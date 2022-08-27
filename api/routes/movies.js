const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        } catch (err) {
            res.status(500).json(err);
        };
    } else {
        res.status(403).json("You are not authenticated!");
    };
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("Movie has been deleted!");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
});

//GET
router.get("/find/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET RANDOM
router.get("/random", async (req, res) => {
    const type = req.query.type; //So I can select movie or series for featured component
    let movie;
    //If I give type series
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } } //To get one random sample
            ]);
        } else {
            //If I give type move or give no type
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ]);
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL MOVIES
router.get("/", async (req, res) => {
    // if (req.user.isAdmin) {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies.reverse()); //To send last entry first
    } catch (err) {
        res.status(500).json(err);
    }
    // } else {
    //     res.status(403).json("You are not allowed!");
    // }
});

//GET STATS
//Returns total number of movies per month
router.get("/stats", verify, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(
        date.setFullYear(date.getFullYear() - 1) //Returns last year today
    );
    try {
        const data = await Movie.aggregate([
            { $match: { createdAt: { $gte: lastYear } } }, //Match created at greater then last year
            {
                $project: {
                    month: { $month: "$createdAt" } //Created month variable and take the month number inside createdAt
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;