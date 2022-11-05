const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    publication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Like', likeSchema);