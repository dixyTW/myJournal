const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
//const auth = require('../../middleware/auth');

//Entry Model 
const {userEntries, Entry} = require('../../models/UserEntry');


// router.get('/', (req, res) => {
//     // used for testing 
//     Entry.find()
//     .then(entries => res.json(entries))
// })

router.get('/:id', (req, res) => {
    const filter = {id: req.params.id}
    userEntries.findOne(filter)
        .then(uEntries => res.json(uEntries.entryList))
        .catch(err => res.status(404).json({message: "no entries found"}))
});

router.post('/:id', (req,res) => {
    const newEntry = new Entry({
        date: Date(),
        title: req.body.title,
        content: req.body.content,
        favorite: req.body.favorite
    })
    
    const filter = {id: req.params.id}
    userEntries.findOne(filter)
    .then(uEntry => {
        if (!uEntry) {
            //if user has no entries, create a new UserEntry model and store it for the user
            const newUserEntry = new userEntries({
                id: req.params.id,
                entryList: [newEntry]
            })
            newUserEntry.save()
                .then(res.send(newEntry))
        }
        else {
                uEntry.entryList.push(newEntry)
                userEntries.findOneAndUpdate(filter, {entryList: uEntry.entryList}, {new: true}, (err, result) => {
                    if (err) {
                        console.log("somethings wrong")
                    }
                    res.send(newEntry)
                })

        }
    })
   
});

router.post('/', (req, res) => {
    const filter = {id: req.body.userID}
    const entryID = req.body.entryID
    userEntries.findOne(filter)
    .then(uEntry => {
        for (var i in uEntry.entryList) {

            if (uEntry.entryList[i]._id == entryID) {
                uEntry.entryList[i].favorite ^= 1
                break;
            }
        }
        userEntries.findOneAndUpdate(filter, {entryList: uEntry.entryList}, {new: true}, (err, result) => {
            if (err) {
                console.log("somethings wrong")
            }

            res.send(result)
        })
        
    })

})

router.delete('/:id', (req,res) => {
    const filter = {id: req.params.id}
    const entryID = mongoose.Types.ObjectId(req.body.entryID)
    userEntries.findOne(filter)
        .then(uEntry => {
            for(var i = 0; i < uEntry.entryList.length; i++) {
                if (uEntry.entryList[i]._id.equals(entryID)) {
                    uEntry.entryList.splice(i,1);
                    break;
                }
            }
             userEntries.findOneAndUpdate(filter, {entryList: uEntry.entryList}, {new: true}, (err, result) =>{
                if (err) {
                    console.log("something went wrong")
                }
                res.send(result)
             })
        })
        .catch(err => {
            res.status(404).json({ message: "no entry found"})
        })
})

module.exports = router;