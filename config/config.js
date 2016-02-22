/**
 * Module dependencies.
 */

var path = require('path');
var extend = require('util')._extend;


var defaults = {
    root: path.normalize(__dirname + '/..'),
    app : {
        name : 'A boilerplate Node.js app using Express 4 server-side and AngularJs client-side'
    }
};

/**
 * Expose
 */

module.exports = {
    development: extend(defaults),
    test: extend(defaults),
    production: extend(defaults)
}[process.env.NODE_ENV || 'development'];
