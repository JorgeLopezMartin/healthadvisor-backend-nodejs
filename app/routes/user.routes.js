const bodyParser = require('body-parser');

// Router for user related actions
module.exports = (app) => {
    const userOrchestrator = require("../controllers/user.controller.js");

    var router = require("express").Router();
    
    // Creates a new expert user (admin only)
    router.post("/expert", bodyParser.json(), userOrchestrator.updateUser);

    // Create new user
    router.post("/", bodyParser.json(), userOrchestrator.createUser);


    // Gets user bookmarks content
    router.get("/:appname/:username/bookmarks", userOrchestrator.bookmarkContent);

    // Gets user favorites content
    router.get("/:appname/:username/favorites", userOrchestrator.favoritesContent);




    app.use("/api/user", router);
};

