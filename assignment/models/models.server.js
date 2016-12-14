module.exports = function() {

    

    var connectionString = 'mongodb://heroku_lwvk20zz:telf50blhci9bp5vti2voqv3pn@ds063536.mlab.com:63536/heroku_lwvk20zz';


    var mongoose = require('mongoose');
    mongoose.connect(connectionString);
    


    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server.js")();
    var pageModel = require("./page/page.model.server.js")();
    var widgetModel = require("./widget/widget.model.server.js")();


    var model = {
        userModel: userModel,
        websiteModel:websiteModel,
        pageModel:pageModel,
        widgetModel:widgetModel
    };

    return model;
};