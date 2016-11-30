
module.exports = function () {
    var mongoose = require("mongoose");
    var pageSchema =require("../page/page.schema.server.js")(mongoose);

    var WebsiteSchema = mongoose.Schema({
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String,
        description: String,
        pages: [pageSchema],
    }, {collection: "website"});
    return WebsiteSchema;
}
