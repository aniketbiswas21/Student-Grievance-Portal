const express=require('express');
const mongoose=require('mongoose');

const {Issue,validate}=require('../model/issue');
const {User}=require('../model/user');

const auth = require('../middleware/auth');

const router=express.Router();

// get all issues
router.get('/',async (req,res)=>{
    const issues= await Issue.find().sort('-date').limit(50);
    res.send(issues);
});

// get issues posted by the currently logined user
router.get('/myissues',auth,async (req,res)=>{
    const issues = await Issue.find( { user_id:req.user._id } );
    if(!issues) return res.status(404).send('Not Found');
    res.send(issues);
});

// post issues by logined user 
router.post('/',auth, async(req,res)=>{
    const {error}= validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const user=await User.findById(req.user._id);
    if(!user) return res.status(400).send('Invalid User');

    let issue=new Issue({
        category: req.body.category,
        subject: req.body.subject,
        statement: req.body.statement,
        user_id: req.user._id,
        user:{
            username: user.username,
            email: user.email
        }
    });

    issue=await issue.save();

    res.send(issue);
});

// edit issue for only the user who put them
router.put('/:id',auth,async (req,res)=>{
    const {error}= validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const user=await User.findById(req.user._id);
    if(!user) return res.status(400).send('Invalid User');

    let issue=await Issue.findById(req.params.id);
    if(!issue) return res.status(404).send('Not Found');
    
    if(issue.user_id!=req.user._id){
        return res.send("Unautherized.")
    }
    
    issue= await Issue.findByIdAndUpdate(req.params.id,{
        category: req.body.category,
        subject: req.body.subject,
        statement: req.body.statement,
        user:{
            username: user.username
        }
    },{new:true});

    

    res.send(issue);

});

// delete the issue
router.delete('/:id',auth,async (req,res)=>{
    
    let issue=await Issue.findById(req.params.id);
    if(!issue) return res.status(404).send('Not Found');
    
    if(issue.user_id!=req.user._id){
        return res.send("Unautherized.")
    }

    issue=await Issue.findByIdAndRemove(req.params.id);
    res.send(issue);
});

module.exports=router;