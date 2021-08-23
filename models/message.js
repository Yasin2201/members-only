const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = ({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, minLength: 1, maxLength: 30, required: true },
    title: { type: String, minLength: 1, maxLength: 250, required: true },
    date: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.module("Message", MessageSchema)