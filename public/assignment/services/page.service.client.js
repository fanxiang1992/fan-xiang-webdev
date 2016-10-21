(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function WebsiteService() {
        var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage

        };
        return api;

        function findPageById(pid) {
            for (var p in pages) {
                if (pages[p]._id === pid) {
                    return pages[p];
                }
            }
            return null;
        }

        function findPageByWebsiteId(wid) {
            for (var p in pages) {
                if (pages[p].websiteId === wid) {
                    return pages[p];
                }
            }
            return null;
        }

        function createPage(wid, page) {
            page.websiteId = wid;
            pages.push(page);
        }

        function updatePage(pid, page) {
            for (var p in pages) {
                if (pages[p]._id === pid) {
                    pages[w] = page;
                }
            }
        }

        function deletePage(pid) {
            var index = -1;
            for(var p in pages) {
                temp = pages[p];
                if(temp._id === wid) {
                    index = p;
                    break;
                }
            }
            if (index >= 0) {
                pages = pages.splice(index, 1);
            }
        }
    }
})();