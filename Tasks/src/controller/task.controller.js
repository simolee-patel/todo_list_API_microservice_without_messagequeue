const jwtToken = require("../Validation/jwt_validation")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { successResponse, errorResponse } = require("../Validation/response/response")
const httpStatus = require('http-status')
const taskRepository = require("../repository/task.repository");
const response_message = require("../Validation/response/response-message");
const { PublishTaskEvent } = require("../utils");

module.exports = {
    addTask: async function (req) {
        req.body.userId = req.user.id
        var taskData = await taskRepository.addTask(req.body);
        try {
            if (taskData) {
                let data = await taskRepository.GetProductPayload(req.user.id, taskData, "ADD_TASK")

                PublishTaskEvent(data)

                return successResponse(httpStatus.OK, response_message.success, taskData)
            }
        } catch (error) {
            return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.serverError)
        }
    },

    removeTask: async function (req) {
        req.body.userId = req.user.id
        var taskData = await taskRepository.deleteById(req.params.id);
        try {
            if (taskData == null) {
                return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.alreadyDeleted)
            }
            if (taskData) {
                let data = await taskRepository.GetProductPayload(req.user.id, taskData, "REMOVE_TASK")

                PublishTaskEvent(data)

                return successResponse(httpStatus.OK, response_message.success, "Task is removed successfully")
            }
        } catch (error) {
            return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.serverError)
        }
    },

    updateTask: async function (req) {
        req.body.userId = req.user.id
        var taskData = await taskRepository.updateById(req.body.id, req.body);
        try {
            if (taskData == null) {
                return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.alreadyDeleted)
            }
            if (taskData) {
                let data = await taskRepository.GetProductPayload(req.user.id, taskData, "UPDATE_TASK")

                PublishTaskEvent(data)

                return successResponse(httpStatus.OK, response_message.success, "Task is updated successfully.")
            }
        } catch (error) {
            return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.serverError)
        }
    },

}