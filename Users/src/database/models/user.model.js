const mongoose = require('mongoose');
const priority = require("../enum/priority.enum")

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    username: String,
    email: String,
    password: String,
    token: String,
    task: [
        {
            _id: { type: String, require: true },
            name: { type: String },
            description: { type: String },
            priority: { type: Number }
        }
    ],
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('customer', CustomerSchema);