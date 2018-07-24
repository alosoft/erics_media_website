const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    name: String,
    image: String,
    type: String,
    description: String,
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
});

module.exports = mongoose.model("Picture", pictureSchema);