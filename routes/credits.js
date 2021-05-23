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
    const creditExist = await Credit.findOne({ owner: req.body.owner });
    if (creditExist) return res.status(400).send('Owner already exist');

    //Create a new credit
    const credit = new Credit({
        owner: req.body.owner,
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
router.put('/:owner', verify, async (req, res) => {

    //Validate Data
    const { error } = postput_creditValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if credit exist
    const creditExist = await Credit.findOne({ owner: req.params.owner });
    if (!creditExist) return res.status(400).send('Owner do not exist');

    //Edit a credit
    try {
        const credit = await Credit.updateOne({ owner: req.params.owner },
            {
                $set:
                {
                    owner: req.body.owner,
                    value: req.body.value
                }
            });
        res.send(req.params.owner + ' Updated');
    } catch (err) {
        res.status(400).send(err);
    }
});

//GET credit
router.get('/:owner', verify, async (req, res) => {

    //Check if credit exist
    const creditExist = await Credit.findOne({ owner: req.params.owner });
    if (!creditExist) return res.status(400).send('Owner do not exist');

    //Get a credit
    try {
        const credit = await Credit.findOne({ owner: req.params.owner });
        res.json(credit);
    } catch (err) {
        res.status(400).send(err);
    }
});

//DELETE credit
router.delete('/:owner', async (req, res) => {

    //Check if credit exist
    const creditExist = await Credit.findOne({ owner: req.params.owner });
    if (!creditExist) return res.status(400).send('Owner do not exist');

    try {
        const removedcredit = await Credit.deleteOne({ owner: req.params.owner });
        res.send(req.params.owner + ' Deleted')
    } catch (err) {
        res.json({ message: err });
    }

});


module.exports = router;