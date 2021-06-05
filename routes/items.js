const router = require('express').Router();
const Item = require('../models/Item');
const verify = require('../verify_token');
const { postput_itemValidation } = require('../validation');


//POST Item
router.post('/', verify, async (req, res) => {

    //Validate Data
    const { error } = postput_itemValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if item exist
    const itemExist = await Item.findOne({ name: req.body.name });
    if (itemExist) return res.status(400).send('Item already exist');

    //Create a new item
    const item = new Item({
        name: req.body.name,
        price: req.body.price
    });
    try {
        const savedItem = await item.save();
        res.json(savedItem);
    } catch (err) {
        res.status(400).send(err);
    }
});

//PUT Item
router.put('/:item', verify, async (req, res) => {

    //Validate Data
    const { error } = postput_itemValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if item exist
    const itemExist = await Item.findOne({ name: req.params.item });
    if (!itemExist) return res.status(400).send('Item do not exist');

    //Edit a item
    try {
        const item = await Item.updateOne({ name: req.params.item },
            {
                $set:
                {
                    name: req.body.name,
                    price: req.body.price
                }
            });
        res.send(req.params.item + ' Updated');
    } catch (err) {
        res.status(400).send(err);
    }
});

//GET Item
router.get('/', verify, async (req, res) => {

    try {
        const item = await Item.find();
        res.json(item);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:item', verify, async (req, res) => {

    //Check if item exist
    const itemExist = await Item.findOne({ name: req.params.item });
    if (!itemExist) return res.status(400).send('Item do not exist');

    //Get a item
    try {
        const item = await Item.findOne({ name: req.params.item });
        res.json(item);
    } catch (err) {
        res.status(400).send(err);
    }
});

//DELETE Item
router.delete('/:item', verify, async (req, res) => {

    //Check if item exist
    const itemExist = await Item.findOne({ name: req.params.item });
    if (!itemExist) return res.status(400).send('Item do not exist');

    try {
        const removedItem = await Item.deleteOne({ name: req.params.item });
        res.send(req.params.item + ' Deleted')
    } catch (err) {
        res.json({ message: err });
    }

});
/*
//Submit a post
router.post('/', async(req, res)=>{
    const post = new Post({
        title : req.body.title,
        description : req.body.description
    });
    try{
    const savedPost = await post.save();
    res.json(savedPost);
    }catch(err){
        res.json({message: err});
    }
});

//Get back all post
router.get('/', async(req, res) =>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message: err});
    }
});

//Get back specific post
router.get('/:postId', async(req, res)=>{
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({message: err});
    }
    
})

//Delete post
router.delete('/:postId', async(req, res)=>{
    try{
        const removedPost = await Post.deleteOne({_id: req.params.postId});
        res.json(removedPost);
    }catch(err){
        res.json({message: err});
    }
    
})

//Update a post
router.patch('/:postId', async(req, res)=>{
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId},
            { $set: 
                {title: req.body.title}});
        res.json(updatedPost);
    }catch(err){
        res.json({message: err});
    }
    
})*/


module.exports = router;