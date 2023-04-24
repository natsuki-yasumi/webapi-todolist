const mongoose = require('mongoose');

const userModel = mongoose.model('User', {
    name: String,
    email: String
});


module.exports = userModel;