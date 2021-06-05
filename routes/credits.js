const router = require('express').Router();
const Credit = require('../models/Credit');
const verify = require('../verify_token');
const { postput_creditValidation } = require('../validation');


//POST credit
router.post('/', verify, async (req, res) => {

    //Validate Data
    const { error } = postput_creditValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if credit exist
    const creditExist = await Credit.findOne({ email: req.body.email });
    if (creditExist) return res.status(400).send('Email already exist');

    //Create a new credit
    const credit = new Credit({
        owner: req.body.owner,
        email: req.body.email,
        value: req.body.value
    });
    try {
        const savedcredit = await credit.save();
        res.json(savedcredit);
    } catch (err) {
        res.status(400).send(err);
    }
});

//PUT credit
router.put('/:email', verify, async (req, res) => {

    //Validate Data
    const { error } = postput_creditValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if credit exist
    const creditExist = await Credit.findOne({ email: req.params.email });
    if (!creditExist) return res.status(400).send('Email do not exist');

    //Edit a credit
    try {
        const credit = await Credit.updateOne({ email: req.params.email },
            {
                $set:
                {
                    owner: req.body.owner,
                    email: req.body.email,
                    value: req.body.value
                }
            });
        res.send(req.params.owner + "'s Account Updated.");
    } catch (err) {
        res.status(400).send(err);
    }
});

//GET credit
router.get('/:email', verify, async (req, res) => {

    //Check if credit exist
    const creditExist = await Credit.findOne({ email: req.params.email });
    if (!creditExist) return res.status(400).send('Owner do not exist');

    //Get a credit
    try {
        const credit = await Credit.findOne({ email: req.params.email });
        res.json(credit);
    } catch (err) {
        res.status(400).send(err);
    }
});

//DELETE credit
router.delete('/:email', verify, async (req, res) => {

    //Check if credit exist
    const creditExist = await Credit.findOne({ email: req.params.email });
    if (!creditExist) return res.status(400).send('Owner do not exist');

    try {
        const removedcredit = await Credit.deleteOne({ email: req.params.email });
        res.send(req.params.owner + "'s Account Deleted.")
    } catch (err) {
        res.json({ message: err });
    }

});


module.exports = router;