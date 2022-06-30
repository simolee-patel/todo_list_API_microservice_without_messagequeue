const axios = require("axios")
module.exports.PublishTaskEvent = async (payload) => {

    axios.post('http://localhost:8001/app-events', {
        payload
    })

};

module.exports.FormateData = (data) => {
    if (data) {
        return { data }
    } else {
        throw new Error('Data Not found!')
    }
}