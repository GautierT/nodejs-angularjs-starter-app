var config = require('../../config/config');


exports.home = function (req, res, next) {

    res.json({
        message : 'Hi !',
        app_name : config.app.name
    })
};

