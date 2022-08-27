const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body);
        try {
            const savedList = await newList.save();
            res.status(201).json(savedList);
        } catch (err) {
            res.status(500).json(err);
        };
    } else {
        res.status(403).json("You are not authenticated!");
    };
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(201).json("List has been deleted!");
        } catch (err) {
            res.status(500).json(err);
        };
    } else {
        res.status(403).json("You are not authenticated!");
    };
});

//UPDATE LIST
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedList = await List.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedList);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
});

//GET LIST
router.get("/find/:id", async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET LISTS
router.get("/", async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];

    try {
        //If there is typeQuery (movie or series)
        if (typeQuery) {
            //If there is typeQuery (movie or series) and also genreQuery
            if (genreQuery) {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: genreQuery } }
                ]);
                //If we have typeQuery but don't have genreQuery
            } else {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } }
                ]);
            }
        } else {
            //If there is no typeQuery give back random list of 10 items
            list = await List.aggregate([
                { $sample: { size: 10 } }
            ]);
        }
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET LISTS STATS
router.get("/stats", verify, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(
        date.setFullYear(date.getFullYear() - 1) //Returns last year today
    );
    try {
        const data = await List.aggregate([
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