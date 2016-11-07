(function(){
  angular.module("WebAppMaker")
  .factory("WebsiteService", WebsiteService);

  function WebsiteService($http) {
    

    var api = {
      findWebsitesForUser: findWebsitesForUser,
      findWebsiteById: findWebsiteById,
      createWebsite: createWebsite,
      updateWebsite: updateWebsite,
      deleteWebsite: deleteWebsite

    };
    return api;

    function findWebsiteById(wid) {
      var url = '/api/website/' + wid;
      return $http.get(url);
    }

    function findWebsitesForUser(uid) {
      var url = '/api/user/' + uid + '/website';
      return $http.get(url);
    }

    function createWebsite(uid, website) {
      website.developerId = uid;
      var url = '/api/user/' + uid + '/website';
      return $http.post(url, website);
    }

    function updateWebsite(wid, website) {
      var url = '/api/website/' + wid;
      return $http.put(url, website);
    }

    function deleteWebsite(wid) {
      var url = '/api/website/' + wid;
      return $http.delete(url)
      
    }
  }
})();