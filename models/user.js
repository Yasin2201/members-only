const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = ({
    username: { type: String, minLength: 1, maxLength: 10, required: true },
    password: { type: String, minLength: 1, required: true },
    isMember: { type: Boolean, default: false, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model("User", UserSchema)