(function(){
  angular.module("WebAppMaker")
  .controller("WebsiteListController", WebsiteListController);

  function WebsiteListController($routeParams, WebsiteService) {
    var vm = this;
    vm.userId = $routeParams['uid'];

    function init() {
      WebsiteService.findWebsitesForUser(vm.userId).success(function(websites){
        vm.websites = websites;
      });
    }
    init();
  }
})();


(function () {
  angular.module("WebAppMaker")
  .controller("WebsiteEditController", WebsiteEditController);

  function WebsiteEditController($routeParams, WebsiteService, $route, $location) {
    var vm = this;
    vm.websiteId = $routeParams.wid;
    vm.userId = $routeParams.uid;
    vm.updateWebsite = updateWebsite;
    vm.deleteWebsite = deleteWebsite;
    
    function init() {
      WebsiteService.findWebsitesForUser(vm.userId).success(function(websites){
        vm.websites = websites;
      });

      WebsiteService.findWebsiteById(vm.websiteId).success(function(website) {
        vm.website = website;
      });
    }
    init();

    function updateWebsite(website) {
      WebsiteService.updateWebsite(vm.websiteId, website).success(function() {
        $location.url("/user/" + vm.userId + "/website");
      });
    }

    function deleteWebsite() {
      WebsiteService.deleteWebsite(vm.websiteId).success(function() {
        $location.url("/user/" + vm.userId + "/website");
      })
    }
  }
})();


(function () {
  angular.module("WebAppMaker")
  .controller("WebsiteNewController", WebsiteNewController);

  function WebsiteNewController($routeParams, WebsiteService, $route, $location) {
    var vm = this;
    var websiteId = parseInt($routeParams.wid);
    vm.userId = $routeParams.uid;
    vm.createWebsite = createWebsite;
    
    function init() {
      var promise = WebsiteService.findWebsitesForUser(vm.userId);
      promise
      .success(function(websites){
        vm.websites = websites;
      });
    }
    init();

    function createWebsite(website) {
      if(!website || !website.name || !website.description) {
        vm.error = "Website name or description can't be empty";
        return;
      }

      //WebsiteService.createWebsite(vm.userId, website);
      WebsiteService.createWebsite(vm.userId, website)
      .success(function (website) {
        $location.url("/user/" + vm.userId + "/website");
      });
    }
  }
})();