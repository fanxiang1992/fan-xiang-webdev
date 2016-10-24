(function(){
  angular.module("WebAppMaker")
  .factory("WidgetService", WidgetService);

  function WidgetService() {
    var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "50%",
    "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum2</p>"}
    ];

    var api = {
      createWidget: createWidget,
      findWidgetsByPageId: findWidgetsByPageId,
      findWidgetById: findWidgetById,
      updateWidget: updateWidget,
      deleteWidget: deleteWidget
    };
    return api;

    function createWidget(pid, widget) {
      widget._id = widgets.length.toString();
      widget.pageId = pid;
      widgets.push(widget);
      return widget._id;
    }

    function findWidgetById(wid) {
      for(var w in widgets) {
        if(widgets[w]._id == wid) {
          return widgets[w];
        }
      }
      return null;
    }

    function findWidgetsByPageId(pid) {
      result = [];
      for (var w in widgets) {
        if (widgets[w].pageId == pid) {
          result.push(widgets[w]);
        }
      }
      return result;
    }

    function updateWidget(wid, widget) {
      for (var w in widgets) {
        if (widgets[w]._id == wid) {
          pages[w] = page;
        }
      }
    }

    function deleteWidget(wid) {
      var index = -1;
      for(var w in widgets) {
        temp = widgets[w];
        if(temp._id == wid) {
          index = w;
          break;
        }
      }
      if (index >= 0) {
        widgets.splice(index, 1);
      }
    }
  }
})();