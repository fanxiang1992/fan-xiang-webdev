(function(){
  angular.module("WebAppMaker")
  .controller("WebsiteListController", WebsiteListController);

  function WebsiteListController($routeParams, WebsiteService) {
    var vm = this;
    vm.userId = parseInt($routeParams['uid']);

    function init() {
      vm.websites = WebsiteService.findWebsitesForUser(vm.userId);
    }
    init();
  }
})();


(function () {
  angular.module("WebAppMaker")
  .controller("WebsiteEditController", WebsiteEditController);

  function WebsiteEditController($routeParams, WebsiteService, $route) {
    var vm = this;
    vm.websiteId = parseInt($routeParams.wid);
    vm.userId = parseInt($routeParams.uid);
    vm.updateWebsite = updateWebsite;
    vm.deleteWebsite = deleteWebsite;
    
    function init() {
      vm.websites = WebsiteService.findWebsitesForUser(vm.userId);
      vm.website = WebsiteService.findWebsiteById(vm.websiteId);
    }
    init();

    function updateWebsite(website) {
      WebsiteService.updateWebsite(vm.websiteId, website);
    }

    function deleteWebsite() {
      WebsiteService.deleteWebsite(vm.websiteId);
      $route.reload();
    }
  }
})();


(function () {
  angular.module("WebAppMaker")
  .controller("WebsiteNewController", WebsiteNewController);

  function WebsiteNewController($routeParams, WebsiteService, $route) {
    var vm = this;
    var websiteId = parseInt($routeParams.wid);
    vm.userId = parseInt($routeParams.uid);
    vm.createWebsite = createWebsite;
    
    function init() {
      vm.websites = WebsiteService.findWebsitesForUser(vm.userId);
    }
    init();

    function createWebsite(website) {
      if(!website || !website.name || !website.description) {
        vm.error = "Website name or description can't be empty";
        return;
      }

      WebsiteService.createWebsite(vm.userId, website);
      $route.reload();
    }
  }
})();