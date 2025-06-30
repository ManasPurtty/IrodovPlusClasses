const express = require('express');
const router = express.Router();
const ownermodel = require('../Models/ownermodel'); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generatetoken");
router.get('/', (req, res) => {
    res.send('owner is working');
});




router.post('/login', async(req,res)=>{
    let { email, password } = req.body;
    
        // 1. Check if email exists in owner collection
        let owner = await ownermodel.findOne({ email: email });
        if (owner) {
            // Compare password for owner
            bcrypt.compare(password, owner.password, function(err, result) {
                if (result) {
                    let token = generateToken(owner);
                    res.cookie("token", token);
                    return res.send("Success");
                } else {
                    return res.send("owner password incorrect");
                }
            });
            return; // Stop further execution
        }
   });





module.exports = router;