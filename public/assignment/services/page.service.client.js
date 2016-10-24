(function(){
  angular.module("WebAppMaker").factory("PageService", PageService);

  function PageService() {
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
        if (pages[p]._id == pid) {
          return pages[p];
        }
      }
      return null;
    }

    /*
    retrieves the pages in local pages array whose websiteId matches the parameter websiteId
    */
    function findPageByWebsiteId(wid) {
      result = [];
      for (var p in pages) {
        if (pages[p].websiteId == wid) {
          result.push(pages[p]);
        }
      }
      return result;
    }

    function createPage(wid, page) {
      page._id = pages.length.toString();
      page.websiteId = wid;
      pages.push(page);
    }

    function updatePage(pid, page) {
      for (var p in pages) {
        if (pages[p]._id == pid) {
          pages[p] = page;
        }
      }
    }

    function deletePage(pid) {
      var index = -1;
      for(var p in pages) {
        temp = pages[p];
        if(temp._id == pid) {
          index = p;
          break;
        }
      }
      if (index >= 0) {
        pages.splice(index, 1);
      }
    }
  }
})();