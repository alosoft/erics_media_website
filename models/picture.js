const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    title: String,
    name: String,
    image: String,
    credit: String,
    thumbnail: String,
    location: String,
    coordinate: String,
    created: String,
    type: String,
    description: String,
    orientation: String,
    page: String,
    video: String,
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
});

module.exports = mongoose.model("Picture", pictureSchema);