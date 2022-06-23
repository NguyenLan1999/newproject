const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Book = new Schema({
    name: {type: String, required: true},
    author: String,
    description: String,
    img: String,
    slug:{ type: String, slug: "name", unique: true },
    introduce: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Book', Book);
