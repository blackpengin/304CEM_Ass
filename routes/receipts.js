const router = require('express').Router();
const Receipt = require('../models/Receipt');
const verify = require('../verify_token');
const { post_receiptValidation } = require('../validation');


//POST receipt
router.post('/', verify, async (req, res) => {

    //Validate Data
    const { error } = post_receiptValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Create a new receipt
    const receipt = new Receipt({
        buyer: req.body.buyer,
        items: req.body.items,
        total_price: req.body.total_price,
        staff: req.body.staff,
    });
    try {
        const savedreceipt = await receipt.save();
        res.json(savedreceipt);
    } catch (err) {
        res.status(400).send(err);
    }
});

//GET receipt
router.get('/:buyer/:date', verify, async (req, res) => {

    //Check if receipt exist
    const receiptExist = await Receipt.findOne({
        buyer: req.params.buyer,
        date: '2021-05-23'
    });
    if (!receiptExist) return res.status(400).send('No receipt found');

    //Get a receipt
    try {
        const receipt = await Receipt.findOne({ buyer: req.params.buyer, date: req.params.date });
        res.json(receipt);
    } catch (err) {
        res.status(400).send(err);
    }
});

//DELETE receipt
router.delete('/:buyer/:date', verify, async (req, res) => {

    //Check if receipt exist
    const receiptExist = await Receipt.findOne({ buyer: req.params.buyer, date: req.params.date });
    if (!receiptExist) return res.status(400).send('No receipt found');

    try {
        const removedreceipt = await Receipt.deleteOne({ buyer: req.params.buyer, date: req.params.date });
        res.send('Receipt Deleted');
    } catch (err) {
        res.json({ message: err });
    }

});


module.exports = router;