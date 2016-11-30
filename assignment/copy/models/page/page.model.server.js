
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

    function createPage(websiteId, page){
        page["_website"] = websiteId;
        return PageModel.create(page);
    }

    function findAllPagesForWebsite(websiteId){
        return PageModel
            .find({
                _website: websiteId
            });
    }

    

    function updatePage(pageId, page) {
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

    function deletePage(pageId) {
        return PageModel
            .remove({
                _id: pageId
            });
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }


    

    

}