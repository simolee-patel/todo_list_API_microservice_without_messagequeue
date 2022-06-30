const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const router = express.Router();
const userRouter = require('./router/task.route')(router)
const bodyParser = require('body-parser')

const StartServer = async () => {

    const app = express();

    await databaseConnection();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use("/", router)

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
            process.exit();
        })
}

StartServer();