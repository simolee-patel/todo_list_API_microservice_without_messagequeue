const jwtToken = require("../Validation/jwt_validation")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { successResponse, errorResponse } = require("../Validation/response/response")
const httpStatus = require('http-status')
const userRepository = require("../repository/user.repository");
const response_message = require("../Validation/response/response-message");
const userModel = require("../database/models/user.model");

module.exports = {
    signUp: async function (req) {

        req.body.password = await bcrypt.hash(req.body.password, 10);
        var userData = await userRepository.addUser(req.body);
        try {
            if (userData) {
                let token = await jwtToken.generateToken({ username: userData.username, email: userData.email, id: String(userData._id) })
                userData.token = token
                return successResponse(httpStatus.OK, response_message.success, userData)
            }
        } catch (error) {
            return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.serverError)
        }
    },

    logIn: async function (req) {
        try {
            const { email, password } = req.body;
            if (!(email && password)) {
                return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.enterRequiredField)
            }
            let user = await userRepository.findByEmail(email)
            if (user && (await bcrypt.compare(password, user.password))) {
                let token = await jwtToken.generateToken({ username: user.username, email: user.email, id: String(user._id) })
                user.token = token;
                return successResponse(httpStatus.OK, response_message.success, user)
            }
            return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.invalidCredentials)
        }
        catch {
            return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.invalidCredentials)
        }
    },

    autoLogin: async function (req) {
        try {
            const { token } = req.body;
            if (!(token)) {
                return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.enterRequiredField)
            }
            try {
                let token = await jwtToken.verifyToken(req.body.token)
                if (token) {
                    let data = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY)
                    return successResponse(httpStatus.OK, response_message.success, data)
                }
                else {
                    return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.tokenExpired)
                }
            }
            catch (error) {
                return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.tokenExpired)
            }
        }
        catch {
            return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.serverError)
        }
    },

    manageTask: async function (userId, task, toRemove) {

        const user = await userModel.findById(userId)
        let taskData = user.task
        if (toRemove) {
            taskData.map(item => {
                if (item._id == task._id) {
                    taskData.splice(taskData.indexOf(item), 1);
                }
            })
        } else {
            taskData.push(task)
        }

        user.task = taskData
        const taskSaveResult = await user.save();
        console.log(taskSaveResult)
    },
    updateTask: async function (userId, task) {

        const user = await userModel.findById(userId)
        let taskData = user.task

        await taskData.map(item => {
            if (item._id == task._id) {
                taskData.splice(taskData.indexOf(item), 1);
            }
        })
        taskData.push(task)

        user.task = taskData
        const taskSaveResult = await user.save();
        console.log(taskSaveResult)
    },

    SubscribeEvents: async function (payload) {
        const { event, data } = payload;

        const { userId, task } = data;


        switch (event) {

            case 'ADD_TASK':
                this.manageTask(userId, task, false)
                break;
            case 'REMOVE_TASK':
                this.manageTask(userId, task, true);
                break;
            case 'UPDATE_TASK':
                this.updateTask(userId, task);
                break;
            case 'CREATE_ORDER':
                this.ManageOrder(userId, order);
                break;
            default:
                break;
        }

    }
}