const router = require('express').Router()
const { Item } = require('../models')
const db = require('../db')

router.get('/items', (req, res) => {
    db.item.find((err, data) => {
        if (err) {console.log(err)}
        console.log(data)
        res.json(data)
    })
})


// router.get('/items', (req, res) => {
//     Item.findAll()
//         .then()
//         .catch()
// })