const { model, Schema } = require('mongoose')

const User = new Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    username: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = model('User', User)
