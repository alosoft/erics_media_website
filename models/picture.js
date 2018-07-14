let mongoose = require('mongoose');

let pictureSchema = new mongoose.Schema({
    image: String,
    type: String,
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
});

module.exports = mongoose.model("Picture", pictureSchema);