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
      WidgetService.findWidgetById(vm.wgid).success(function(widget) {
        vm.widget = widget;
      });
    }
    init();

    function updateWidget(widget) {
      WidgetService.updateWidget(vm.wgid, widget).success(function() {
        $location.url("/user/" + vm.uid + "/website/" + vm.wid + 
        "/page/" + vm.pid + "/widget");
      }); 
    }

    function deleteWidget() {
      console.log("client delete");
      WidgetService.deleteWidget(vm.wgid).success(function() {
        $location.url("/user/" + vm.uid + "/website/" + vm.wid + 
        "/page/" + vm.pid + "/widget");
      }); 
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
      WidgetService.findWidgetsByPageId(vm.pid).success(function(widgets) {
        vm.widgets = widgets;
      });
    }
    init();

    function checkSafeHtml(html) {
      return $sce.trustAsHtml(html);
    }

    function checkSafeYouTubeUrl(url) {
      var parts = url.split('/');
      var id = parts[parts.length - 1];
      url = "https://www.youtube.com/embed/"+id;
      return $sce.trustAsResourceUrl(url);
    }

    function sortWidget(start, end) {
      WidgetService.sortWidget(vm.pageId, start, end)
      .then(function (response) {
        vm.widgets = response.data;
      }, function(error) {
        vm.error = error.data;
      })
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
      WidgetService.findWidgetsByPageId(vm.pid).success(function(widgets) {
        vm.widgets = widgets;
      });
    }
    init();

    function checkSafeHtml(html) {
      return $sce.trustAsHtml(html);
    }

    function checkSafeYouTubeUrl(url) {
      var parts = url.split('/');
      var id = parts[parts.length - 1];
      url = "https://www.youtube.com/embed/"+id;
      return $sce.trustAsResourceUrl(url);
    }

    function createWidget(type) {
      widget = {};
      widget.widgetType = type;
      WidgetService.createWidget(vm.pid, widget).success(function(widget) {
        wgid = widget._id;
        $location.url("/user/" + vm.uid + "/website/" + vm.wid + 
        "/page/" + vm.pid + "/widget/" + wgid);
      });
      
    }
  }
})();

