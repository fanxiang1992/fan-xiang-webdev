(function(){
  angular.module("WebAppMaker")
  .factory("WidgetService", WidgetService);

  function WidgetService($http) {

    var api = {
      createWidget: createWidget,
      findWidgetsByPageId: findWidgetsByPageId,
      findWidgetById: findWidgetById,
      updateWidget: updateWidget,
      deleteWidget: deleteWidget
    };
    return api;

    function createWidget(pid, widget) {
      widget.pageId = pid;
      var url = '/api/page/' + pid + '/widget';
      return $http.post(url, widget);
    }

    function findWidgetById(wid) {
      var url = '/api/widget/' + wid;
      return $http.get(url);
    }

    function findWidgetsByPageId(pid) {
      var url = '/api/page/' + pid + '/widget';
      return $http.get(url);
    }

    function updateWidget(wid, widget) {
      var url = '/api/widget/' + wid;
      return $http.put(url, widget);
      
    }

    function deleteWidget(wid) {
      var url = '/api/widget/' + wid;
      return $http.delete(url);
    }

    function sortWidget(pageId, start, end) {
      var url = "/api/page/" + pageId + "/widget?start=" + start + "&end=" +end;
      return $http.put(url);
    }
  }
})();