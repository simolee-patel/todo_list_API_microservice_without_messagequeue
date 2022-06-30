const mongoose = require('mongoose');
const priority = require("../enum/priority.enum")

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: Number, default: priority.MED },
    userId: { type: String }

}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('task', TaskSchema);