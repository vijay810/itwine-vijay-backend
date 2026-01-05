let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();
// ClientsAll Model
let teamsSchema = require('../Models/Teams');
// CREATE Clients
router.route("/create-teams").post(async (req, res, next) => {
    await teamsSchema
        .create(req.body)
        .then((result) => {
            res.json({
                data: result,
                message: "Data successfully added!",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});
router.route("/").get(async (req, res, next) => {
    await teamsSchema
        .find()
        .sort({ _id: -1 })
        .then((result) => {
            res.json({
                data: result,
                message: "All items successfully fetched.",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});
router.route("/get-teams/:id").get(async (req, res, next) => {
    await teamsSchema
        .findById(req.params.id)
        .then((result) => {
            res.json({
                data: result,
                message: "Data successfully fetched.",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});

router.route("/delete-teams/:id").delete(async (req, res, next) => {
    await teamsSchema
        .findByIdAndDelete(req.params.id)
        .then((result) => {
            res.json({
                data: result,
                msg: "Team Successfully Deleted.",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});

router.route("/update-teams/:id").put(async (req, res, next) => {
    await teamsSchema
        .findByIdAndUpdate(req.params.id, {
            $set: req.body,
        })
        .then((result) => {
            console.log(result);
            res.json({
                data: result,
                msg: "Data successfully updated.",
            });
        })
        .catch((err) => {
            console.log(err);
        });
});
module.exports = router;