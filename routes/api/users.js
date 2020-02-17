const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

//User Model 
const User = require('../../models/User');



router.post('/', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) { 
        return res.status(400).json({msg: req.body.password})
    }

    User.findOne({email}) 
        .then(user => {
            if(user) {
            return res.status(400).json({msg: "user already exists"});
            }
        })

    
    const newUser = new User({
        firstName,
        lastName,
        email,
        password
    });
    bcrypt.genSalt(10, (err,salt) =>{
        bcrypt.hash(newUser.password, salt, (err,hash) =>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(user =>{
                    jwt.sign(
                        { id:user.id }, //the payload, using user id
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw(err);
                            res.json({
                                token,
                                user:{
                                    _id: user.id,
                                    firstName: user.firstName,
                                    email: user.email
                                }
                            })
                        }
                    )

                    
                })
        })
    })
});





module.exports = router;