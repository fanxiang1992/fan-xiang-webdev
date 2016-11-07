(function () {
  angular
  .module("wamDirective", [])
  .directive("wamSortable", wamSortable);

  function wamSortable() {
    function linker(scope, element, attributes) {
      var start = -1;
      var stop = -1;
      $(element)
      .find("div")
      .sortable(
      {
        start: function (event, ui) {
          start =  ui.item.index();
        },
        stop: function (event, ui) {
          stop = ui.item.index();

          var sortedElement = scope.data.splice(start, 1)[0];
          scope.data.splice(stop, 0, sortedElement);
          scope.sortList({start: start, stop: stop});
        }
      });
    }
    return {
      templateUrl:"./directives/widgetList.html",
      scope: {
        data:"=",
        sortList:"&sort"
      },
      link: linker
    }
  }
})();