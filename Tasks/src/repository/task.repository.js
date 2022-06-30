
const { default: mongoose } = require('mongoose');
const TaskSchema = require('../database/models/task.model')

const FormateData = require("../utils/index")
module.exports = {
    addTask: async function (userData) {
        const user = new TaskSchema(userData);
        var taskData = await user.save();
        return taskData ? taskData : null

    },
    findByEmail: async function (email) {
        var taskData = await TaskSchema.findOne({ email })
        return taskData ? taskData : null

    },
    findById: async function (id) {
        var taskData = await TaskSchema.findById(id)
        return taskData ? taskData : null

    },
    deleteById: async function (id) {
        let mong_id = mongoose.Types.ObjectId(id)
        var taskData = await TaskSchema.findOneAndDelete({ _id: mong_id })
        return taskData ? taskData : null

    },

    updateById: async function (id, data) {
        let mong_id = mongoose.Types.ObjectId(id)
        var taskData = await TaskSchema.findOneAndUpdate({ _id: mong_id }, { name: data.name, description: data.description, priority: data.priority }, { new: true, upsert: true })
        return taskData ? taskData : null

    },


    GetProductPayload: async function (userId, task, event) {
        let id = String(task._id)

        if (task) {
            const payload = {
                event: event,
                data: { userId, task }
            }
            return payload
        } else {
            return FormateData({ error: 'No product available' })
        }


    }
}