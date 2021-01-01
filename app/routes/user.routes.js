const bodyParser = require('body-parser');

// Router for user related actions
module.exports = (app) => {
    const userOrchestrator = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Create new user
    router.post("/", bodyParser.json(), userOrchestrator.create);

    app.use("/api/user", router);
};

