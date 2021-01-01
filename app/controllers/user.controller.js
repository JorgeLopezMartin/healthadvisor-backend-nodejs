const { logger } = require('../../server.js');
const db = require("../models/model-index");
const User = db.users;
const axios = require('axios');



/**
 * Create and Save a new User
 * @param {*} req: request with new user information in body and appname in url
 * @param {*} res: response returned with code 201CREATED and new user info, or error code otherwise
 */
exports.create = (req, res) => {
    logger.info('CreateUser: Starting process');

    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstName;
    let lastname = req.body.lastName;
    let email = req.body.email;
    roles = ['user'];

    if(!username || !password || !firstname || !lastname || !email) {
        logger.info(`CreateUser: Not enough data`);
        res.status(400).send({error: {message: 'Not enough data'}});
        return;
    }

    let condition = {$or:[{username: req.body.username}, {email: req.body.email}]};
    User.findOne(condition).then(data => {
        if (data) {
            logger.info(`CreateUser: User with username ${username} or email ${email} already exists`);
            res.status(409).send({error: {message: `Duplicate username or email`}});
            return Promise.reject(false);
        } else {
            logger.info(`CreateUser: User with username ${username} and email ${email} doesn't exist. Proceeding to create it.`);
            return new Promise((resolve, reject) => {
                const user = new User({
                    username,
                    password,
                    firstname,
                    lastname,
                    email,
                    roles
                });
                user.save(user).then(data => {
                    logger.info(`CreateUser: User ${username} created successfully`);
                    resolve(data);
                }).catch(error => {
                    logger.info(`CreateUser: Error creating user: ${error}`);
                    reject(error);
                })
            });
        }
    }).then(newUserData => {
        logger.info(`CreateUser: Returning new user information`);
        res.status(201).send(newUserData);
    }).catch(mongoError => {
        if (mongoError) {
            logger.error(`CreateUser: Mongo error ${mongoError}`);
            res.status(500).send({error: {message: mongoError}});
        }
    })

};