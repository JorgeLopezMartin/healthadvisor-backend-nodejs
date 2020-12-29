const express = require("express");
const cors = require("cors");
const winston = require('winston');
const app = express();

// Logger configuration
const logger = winston.createLogger({
    // Log only if log level is equal or lower
    level: (process.env.NODE_ENV !== 'production') ? 'debug' : 'error',
    format: winston.format.combine(
        winston.format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
        winston.format.json()
    ),
    transports: [
      new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: './logs/info.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
}

module.exports.logger = logger;

// Cors configuration
var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

// API ping
app.get("/", (req, res) => {
    res.json({ message: "Welcome to HealthAdvisor application" });
});

// Endpoint configuration
require("./app/routes/advisor.routes.js")(app);

const PORT = process.env.PORT || 8070;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});