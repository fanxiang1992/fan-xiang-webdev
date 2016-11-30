
module.exports = function() {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);


    var api = {
        findAllWidgetsForPage: findAllWidgetsForPage,
        createWidget:createWidget,
        updateWidget: updateWidget,
        findWidgetById:findWidgetById,
        updateOrderWhenDel:updateOrderWhenDel,
        uploadImage: uploadImage,
        deleteWidget:deleteWidget,
        sortWidget: sortWidget,
        selectFlicker:selectFlicker

    };
    return api;


    function selectFlicker(widgetId, photo){
        console.log("--------------------selectFlicker--------------------------");
        return WidgetModel
            .update(
                {
                    _id: widgetId
                },
                {
                    url: photo
                }
            );
    }







    function uploadImage(widgetId, filename) {
        console.log("--------------------uploadImage--------------------------");
        return WidgetModel
                .update(
                    {
                        _id: widgetId
                    },
                    {
                        url: '/../../uploads/' + filename
                    }
                );
        }



    function updateOrderWhenDel(pageId, priority){
        console.log("--------------------updateOrderWhenDel--------------------------");
        return WidgetModel
            .find({
                    _page: pageId
                },
                function(error, widgets){
                    widgets.forEach(function(widget){
                        if(widget.priority > priority){
                            widget.priority--;
                            widget.save(function(){});
                        }
                    });
                });
    }


    function deleteWidget(widgetId){
        console.log("--------------------deleteWidget--------------------------");
        return WidgetModel
            .remove({
                _id: widgetId
            })
    }

    function findWidgetById(widgetId){
        console.log("--------------------findWidgetById--------------------------");
        return WidgetModel
            .findById(widgetId);
    }


    function createWidget(pageId, widget){
        console.log("---------------------createWidget-------------------------")
        widget["_page"] = pageId;
        widget["isType"] = false;
        return WidgetModel.create(widget);
    }



    function findAllWidgetsForPage(pageId) {
    console.log("---------------------findAllWidgetsForPage-------------------------")
        return WidgetModel
            .find({
                _page: pageId
            })
            .sort({
                priority: 1
            });
    }

    // function updateWidget(widgetId, widget) {
    //     delete widget._id;
    //     return Widget.update({_id: widgetId}, {$set: widget});
    // }



    function updateWidget(widgetId, widget){
        console.log("---------------------updateWidget-------------------------")
        switch(widget.widgetType) {
            case "HEADER": 
              console.log(widget.name);
              return WidgetModel
                .update(
                    {
                        _id: widgetId
                    },
                    {
                        name: widget.name,
                        text: widget.text,
                        size: widget.size
                    }
                );
              break;

            case "IMAGE": return WidgetModel
                .update(
                    {
                        _id: widgetId
                    },
                    {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width
                    }
                );
                break;

            case "YOUTUBE": return WidgetModel
                .update(
                    {
                        _id: widgetId
                    },
                    {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width
                    }
                );
                break;

            case "TEXT": return WidgetModel
                .update(
                    {
                        _id: widgetId
                    },
                    {
                        text: widget.text,
                        rows: widget.rows,
                        placeholder: widget.placeholder,
                        formatted: widget.formatted
                    }
                );
                break;

            case "HTML": return WidgetModel
                .update(
                    {
                        _id: widgetId
                    },
                    {
                        text: widget.text
                    }
                );
                break;

            default: return WidgetModel;
                break;
        }
    }


    function sortWidget(pageId, start, end){
        start = parseInt(start);
        end = parseInt(end);
        console.log(start);
        console.log(end);

        return WidgetModel
            .find({
                    _page: pageId
                },
                function(error, widgets){
                    widgets.forEach(function(widget){
                        if(start > end){
                            if(widget.priority >= end && widget.priority < start){
                                widget.priority++;
                                widget.save(function(){});
                            } else if(widget.priority === start) {
                                widget.priority = end;
                                widget.save(function(){});
                            }
                        } else {
                            if(widget.priority === start){
                                widget.priority = end;
                                widget.save(function(){});
                            } else if(widget.priority > start  && widget.priority <= end) {
                                widget.priority--;
                                widget.save(function(){});
                            }
                        }
                    });
                });
    };
}