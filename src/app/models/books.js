const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const User = require('./users')

mongoose.plugin(slug);

const Book = new Schema({
    name: {type: String, required: true},
    author: String,
    description: String,
    img: String,
    slug:{ type: String, slug: "name", unique: true },
    introduce: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    email: {
        type: String,
        ref: 'users'
    },
}, {
    timestamps: true,
});



module.exports = mongoose.model('Book', Book);
