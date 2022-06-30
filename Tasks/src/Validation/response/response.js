
const httpStatus = require("http-status");


module.exports = {
    successResponse: function (status, message, data) {
        return response = {
            status: status ? status : httpStatus.OK,
            message: message,
            data: data
        }
    },
    errorResponse: function (status, message) {
        return response = {
            status: status ? status : httpStatus.INTERNAL_SERVER_ERROR,
            message: message
        }
    }
}