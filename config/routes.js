
/**
 * Expose
 */

module.exports = function (app) {

    var config = require('./config');

    var main = require('../app/controllers/main');

    var env = process.env.NODE_ENV || 'development';


    app.get('/*', function(req, res) {
        res.sendFile( config.root +  '/public/views/index.html')
    });

    if (env != 'development') {
        app.use(rollbar.errorHandler(config.rollbar.keyAPI));
    }

    app.use(function (err, req, res, next) {
        var url = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.error('Error Handler : ', err, ' / Url : ' + url + ' / err.stack : ', err.stack);
        res.status(500).send({
            growlMessages: [{
                'text': 'Le serveur a rencontré une erreur. L\'administrateur en a été informé. Veuillez ré-essayer plus tard.',
                'type': 'error'
            }]
        });
    });





};