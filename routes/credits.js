const router = require('express').Router();
const Coupon = require('../models/Credit');
const verify = require('../verify_token');
const { postput_creditValidation, get_creditValidation } = require('../validation');


//POST credit
router.post('/', verify, async (req, res) => {

    //Validate Data
    const { error } = postput_creditValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if credit exist
    const creditExist = await credit.findOne({ name: req.body.name });
    if (creditExist) return res.status(400).send('credit already exist');

    //Create a new credit
    const credit = new credit({
        name: req.body.name,
        price: req.body.price
    });
    try {
        const savedcredit = await credit.save();
        res.json(savedcredit);
    } catch (err) {
        res.status(400).send(err);
    }
});

//PUT credit
router.put('/:credit', verify, async (req, res) => {

    //Validate Data
    const { error } = postput_creditValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if credit exist
    const creditExist = await credit.findOne({ name: req.params.credit });
    if (!creditExist) return res.status(400).send('credit do not exist');

    //Edit a credit
    try {
        const credit = await credit.updateOne({ name: req.params.credit },
            {
                $set:
                {
                    name: req.body.name,
                    price: req.body.price
                }
            });
        res.send(req.params.credit + ' Updated');
    } catch (err) {
        res.status(400).send(err);
    }
});

//GET credit
router.get('/:credit', verify, async (req, res) => {

    //Check if credit exist
    const creditExist = await credit.findOne({ name: req.params.credit });
    if (!creditExist) return res.status(400).send('credit do not exist');

    //Get a credit
    try {
        const credit = await credit.findOne({ name: req.params.credit });
        res.json(credit);
    } catch (err) {
        res.status(400).send(err);
    }
});

//DELETE credit
router.delete('/:credit', async (req, res) => {

    //Check if credit exist
    const creditExist = await credit.findOne({ name: req.params.credit });
    if (!creditExist) return res.status(400).send('credit do not exist');

    try {
        const removedcredit = await credit.deleteOne({ name: req.params.credit });
        res.send(req.params.credit + ' Deleted')
    } catch (err) {
        res.json({ message: err });
    }

});


module.exports = router;