const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    pic: String,
    position: String,
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
});

module.exports = mongoose.model('Home', homeSchema);