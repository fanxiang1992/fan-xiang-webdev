
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
        console.log("----------------updateWebsite------------------")
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
        console.log("----------------FindWebsiteById------------------")
        return WebsiteModel
            .findById(websiteId);
    }

    function deleteWebsite(websiteId) {
        console.log("----------------deleteWebsite------------------")
        return WebsiteModel
            .remove({
                _id:websiteId
            })
    };

    function findWebsitesForUser(userId) {
        console.log("----------------findWebsitesForUser------------------")
        return WebsiteModel
            .find({
                _user: userId
            });
    }

    function createWebsiteForUser(userId,website) {
        console.log("----------------createWebsiteForUser------------------")
        website["_user"] = userId;
        return WebsiteModel.create(website);
    }
};
