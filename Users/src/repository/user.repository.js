
const userSchema = require('../database/models/user.model')
module.exports = {
    addUser: async function (userData) {
        const user = new userSchema(userData);
        var userData = await user.save();
        return userData ? userData : null

    },
    findByEmail: async function (email) {
        var userData = await userSchema.findOne({ email })
        return userData ? userData : null

    }
}