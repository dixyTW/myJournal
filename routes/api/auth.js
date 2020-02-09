const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth');

//User Model 
const User = require('../../models/User');


router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) { 
        return res.status(400).json({msg: "please enter all fields from auth.js"})
    }

    User.findOne({email})
        .then(user => {
            if(!user) {
                return res.status(400).json({msg: "user not found"});
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Invalid crudentials"})
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
});

router.get('/user', auth, (req, res) =>{
    User.findById(req.user.id)
      .select('-password')
      .then(user => res.json(user))
})



module.exports = router;