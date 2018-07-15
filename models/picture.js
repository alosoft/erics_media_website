let mongoose = require('mongoose');

let pictureSchema = new mongoose.Schema({
    // title: String,
    image: String,
    type: String,
    // about: String,
    // comment: String,
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
});

module.exports = mongoose.model("Picture", pictureSchema);