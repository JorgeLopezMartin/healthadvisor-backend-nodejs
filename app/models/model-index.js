const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
const MUUID = require('uuid-mongodb');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model.js")(mongoose);

module.exports = db;
