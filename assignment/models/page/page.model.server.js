
module.exports = function() {
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        findAllPagesForWebsite: findAllPagesForWebsite,
        createPage:createPage,
        findPageById:findPageById,
        updatePage:updatePage,
        deletePage:deletePage
    };
    return api;

    function deletePage(pageId) {
        console.log("----------------deletePage---------------------")
        return PageModel
            .remove({
                _id: pageId
            })
    }

    function updatePage(pageId, page) {
        console.log("----------------updatePage---------------------")
        return PageModel
            .update(
                {
                    _id: pageId
                },
                {
                    name: page.name,
                    title: page.title,
                    description: page.description
                }
            );
    }

    function findPageById(pageId) {
        console.log("----------------findPageById---------------------")
        return PageModel
            .findById(pageId);
    }


    function findAllPagesForWebsite(websiteId){
        console.log("----------------findAllPagesForWebsite---------------------")
        return PageModel
            .find({
                _website: websiteId
            });
    }

    function createPage(websiteId, page){
        console.log("----------------createPage---------------------")
        page["_website"] = websiteId;
        return PageModel.create(page);
    }

}