const { model, Schema } = require('mongoose')
const { schema } = require('./user')

const Item = new Schema({
    text: {
        type: String,
        unique: true,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = model('Item', Item)
