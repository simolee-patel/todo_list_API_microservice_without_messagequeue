const CustomerService = require('../controller/user.controller');

module.exports = function (app) {



    app.use('/app-events', async (req, res, next) => {
        console.log("data in app event", req.body)

        const { payload } = req.body;

        CustomerService.SubscribeEvents(payload);

        console.log("===============  Customer Service Received Event ====== ");
        return res.status(200).json(payload);

    });

}