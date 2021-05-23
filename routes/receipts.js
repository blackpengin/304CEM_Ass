const router = require('express').Router();
const Coupon = require('../models/Receipt');
const verify = require('../verify_token');
const { post_receiptValidation, get_receiptValidation } = require('../validation');


//POST Receipt
router.post('/')
router.post('/register', async (req, res) => {

    //Validate Data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if user exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
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