const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = ({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    title: { type: String, minLength: 1, maxLength: 30, required: true },
    text: { type: String, minLength: 1, maxLength: 250, required: true },
    date: { type: String, required: true }
});

module.exports = mongoose.model("Message", MessageSchema)