const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    content: {type: String},
   
    email: {
        type: String,
        ref: 'User'
    },
    // bookId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Book'
    // },
    }
    ,{
        timestamps: true,
    }
    )



module.exports = mongoose.model('Comment', Comment);