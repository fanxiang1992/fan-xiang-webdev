(function () {
  angular.module("WebAppMaker")
  .controller("WidgetEditController", WidgetEditController);

  function WidgetEditController($routeParams, WidgetService, $sce, $location) {
    var vm = this;
    vm.uid = $routeParams.uid;
    vm.wid = $routeParams.wid;
    vm.pid = $routeParams.pid;
    vm.wgid = $routeParams.wgid;
    vm.updateWidget = updateWidget;
    vm.deleteWidget = deleteWidget;

    function init() {
      vm.widget = WidgetService.findWidgetById(vm.wgid);
    }
    init();

    function updateWidget(widget) {
      WidgetService.updateWidget(vm.sgid, widget);
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + 
        "/page/" + vm.pid + "/widget");
    }

    function deleteWidget() {
      WidgetService.deleteWidget(vm.wgid);
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + 
        "/page/" + vm.pid + "/widget");
    }

  }
})();

(function () {
  angular.module("WebAppMaker")
  .controller("WidgetListController", WidgetListController);

  function WidgetListController($routeParams, WidgetService, $sce) {
    var vm  = this;
    vm.uid  = $routeParams.uid;
    vm.wid  = $routeParams.wid;
    vm.pid  = $routeParams.pid;
    vm.wgid = $routeParams.wgid;
    vm.checkSafeHtml = checkSafeHtml;
    vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

    function init() {
      vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
    }
    init();

    function checkSafeHtml(html) {
      return $sce.trustAsHtml(html);
    }

    function checkSafeYouTubeUrl(url) {
      console.log(url);
      var parts = url.split('/');
      var id = parts[parts.length - 1];
      url = "https://www.youtube.com/embed/"+id;
      console.log(url);
      return $sce.trustAsResourceUrl(url);
    }
  }
})();

(function () {
  angular.module("WebAppMaker")
  .controller("WidgetNewController", WidgetNewController);

  function WidgetNewController($routeParams, WidgetService, $sce, $location) {
    var vm  = this;
    vm.uid  = $routeParams.uid;
    vm.wid  = $routeParams.wid;
    vm.pid  = $routeParams.pid;
    vm.wgid = $routeParams.wgid;
    vm.checkSafeHtml = checkSafeHtml;
    vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;
    vm.createWidget = createWidget;

    function init() {
      vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
    }
    init();

    function checkSafeHtml(html) {
      return $sce.trustAsHtml(html);
    }

    function checkSafeYouTubeUrl(url) {
      var parts = url.split('/');
      var id = parts[parts.length - 1];
      url = "https://www.youtube.com/embed/"+id;
      console.log(url);
      return $sce.trustAsResourceUrl(url);
    }

    function createWidget(type) {
      widget = {};
      widget.widgetType = type;
      wgid = WidgetService.createWidget(vm.pid, widget);
      $location.url("/user/" + vm.uid + "/website/" + vm.wid + 
        "/page/" + vm.pid + "/widget/" + wgid);
    }
  }
})();

