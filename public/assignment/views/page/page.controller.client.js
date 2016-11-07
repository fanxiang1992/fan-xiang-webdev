(function () {
  angular.module("WebAppMaker")
  .controller("PageListController", PageListController);

  function PageListController($routeParams, PageService) {
    var vm = this;
    vm.websiteId = parseInt($routeParams['wid']);
    vm.userId = parseInt($routeParams.uid);

    function init() {
      PageService.findPageByWebsiteId(vm.websiteId).success(function(pages) {
        vm.pages = pages;
      });
    }
    init();
  }
})();


(function () {
  angular.module("WebAppMaker")
  .controller("PageNewController", PageNewController);

  function PageNewController($routeParams, PageService, $location) {
    var vm = this;
    vm.websiteId = parseInt($routeParams['wid']);
    vm.userId = parseInt($routeParams.uid);
    vm.createPage = createPage;

    function createPage(page) {
      if(!page || !page.name || !page.description) {
        vm.error = "Page name or description can't be empty";
        return;
      }

      PageService.createPage(vm.websiteId, page).success(function() {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
      });
    }
  }
})();


(function () {
  angular.module("WebAppMaker")
  .controller("PageEditController", PageEditController);

  function PageEditController($routeParams, PageService, $location) {
    var vm = this;
    vm.websiteId = parseInt($routeParams['wid']);
    vm.userId = parseInt($routeParams.uid);
    var pageId = parseInt($routeParams.pid);
    vm.updatePage = updatePage;
    vm.deletePage = deletePage;
    
    function init() {
      PageService.findPageById(pageId).success(function(page) {
        vm.page = page;
      });
    }
    init();

    function updatePage(page) {
      PageService.updatePage(pageId, page).success(function() {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
      });
    }

    function deletePage() {
      PageService.deletePage(pageId).success(function() {
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
      });
    }
  }
})();