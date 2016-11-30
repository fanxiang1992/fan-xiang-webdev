
module.exports = function() {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findWebsitesForUser:findWebsitesForUser,
        deleteWebsite:deleteWebsite,
        findWebsiteById:findWebsiteById,
        updateWebsite:updateWebsite
    };
    return api;


    function updateWebsite(websiteId,website) {
        return WebsiteModel
            .update(
                {
                    _id: websiteId
                },
                {
                    name: website.name,
                    description: website.description
                }
            );
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel
            .findById(websiteId);
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel
            .remove({
                _id:websiteId
            })
    };

    function findWebsitesForUser(userId) {
        return WebsiteModel
            .find({
                _user: userId
            });
    }

    function createWebsiteForUser(userId,website) {
        website["_user"] = userId;
        return WebsiteModel.create(website);
    }
};
