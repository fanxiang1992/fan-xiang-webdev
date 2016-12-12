
module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("../website/website.schema.server.js")(mongoose);
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        websites: [WebsiteSchema],
        dateCreated: Date,
        facebook: {id: String,token: String}
    },
     {collection: "user"});
    return UserSchema;
}