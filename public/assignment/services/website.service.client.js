(function(){
  angular.module("WebAppMaker")
  .factory("WebsiteService", WebsiteService);

  function WebsiteService() {
    var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    var api = {
      findWebsitesForUser: findWebsitesForUser,
      findWebsiteById: findWebsiteById,
      createWebsite: createWebsite,
      updateWebsite: updateWebsite,
      deleteWebsite: deleteWebsite

    };
    return api;

    function findWebsiteById(wid) {
      for (var w in websites) {
        if (websites[w]._id == wid) {
          return websites[w];
        }
      }
      return null;
    }

    function findWebsitesForUser(uid) {
      var result = [];
      for(var w in websites) {
        if(websites[w].developerId == uid) {
          result.push(websites[w]);
        }
      }
      return result;
    }

    function createWebsite(uid, website) {
      website._id = websites.length.toString();
      website.developerId = uid.toString();
      websites.push(website);
    }

    function updateWebsite(wid, website) {
      for (var w in websites) {
        if (websites[w]._id == wid) {
          websites[w] = website;
        }
      }
    }

    function deleteWebsite(wid) {
      var index = -1;
      for(var w in websites) {
        if(websites[w]._id == wid) {
          index = w;
          break;
        }
      }
      if (index >= 0) {
        websites.splice(index, 1);
      }
    }
  }
})();