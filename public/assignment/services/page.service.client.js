(function(){
  angular.module("WebAppMaker").factory("PageService", PageService);

  function PageService($http) {
    

    var api = {
      createPage: createPage,
      findPageByWebsiteId: findPageByWebsiteId,
      findPageById: findPageById,
      updatePage: updatePage,
      deletePage: deletePage

    };
    return api;

    function findPageById(pid) {
      var url = '/api/page/' + pid;
      return $http.get(url);
    }

    /*
    retrieves the pages in local pages array whose websiteId matches the parameter websiteId
    */
    function findPageByWebsiteId(wid) {
      var url = '/api/website/' + wid + '/page';
      return $http.get(url);
    }

    function createPage(wid, page) {
      page.websiteId = wid;
      return $http.post('/api/website/' + wid + '/page', page);
    }

    function updatePage(pid, page) {
      return $http.put('/api/page/' + pid, page);
    }

    function deletePage(pid) {
      var url = "/api/page/" + pid;
      return $http.delete(url)
    }
  }
})();