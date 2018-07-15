let mongoose = require('mongoose');

let pictureSchema = new mongoose.Schema({
    // title: String,
    name: String,
    image: String,
    type: String,
    description: String,
    // about: String,
    // comment: String,
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
});

module.exports = mongoose.model("Picture", pictureSchema);