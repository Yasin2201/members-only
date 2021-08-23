const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = ({
    username: { type: String, minLength: 1, maxLength: 10, required: true },
    password: { type: String, minLength: 1, required: true },
});

module.exports = mongoose.model("User", UserSchema)