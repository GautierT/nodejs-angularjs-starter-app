var express = require('express');
var bodyParser = require('body-parser');
var winston = require('winston');
var morgan = require('morgan');


var env = process.env.NODE_ENV || 'development';


/**
 * Expose
 */


module.exports = function (app) {


    app.use(express.static('./public'));

    // views is directory for all template files
    app.set('views', './views');
    app.set('view engine', 'ejs');


    // Use winston on production
    var log;
    if (env !== 'development') {
        log = {
            stream: {
                write: function (message, encoding) {
                    winston.info(message);
                }
            }
        };
    } else {
        log = {
            format: 'dev'
        };
    }


    if (env !== 'test') {
        app.use(morgan("dev", log));
    }


    // bodyParser should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.json({
        limit: '5mb'
    }));


};