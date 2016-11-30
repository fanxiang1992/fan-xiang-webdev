
module.exports = function() {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);


    var api = {
        findAllWidgetsForPage: findAllWidgetsForPage,
        createWidget:createWidget,
        updateWidget: updateWidget,
        findWidgetById:findWidgetById,
        uploadImage: uploadImage,
        deleteWidget:deleteWidget,
        sortWidget: sortWidget,
        selectFlicker:selectFlicker

    };
    return api;


    function selectFlicker(widgetId, picture){
        return WidgetModel
            .update(
                {
                    _id: widgetId
                },
                {
                    url: picture
                }
            );
    }

    function uploadImage(widgetId, filename) {
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


    function deleteWidget(widgetId){
        return WidgetModel
            .remove({
                _id: widgetId
            });
    }

    function findWidgetById(widgetId){
        return WidgetModel
            .findById(widgetId);
    }


    function createWidget(pageId, widget){
        widget["_page"] = pageId;
        widget["isType"] = false;
        return WidgetModel.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        return WidgetModel
            .find({
                _page: pageId
            })
            .sort({
                priority: 1
            });
    }


    function updateWidget(widgetId, widget){
        switch(widget.widgetType) {
            case "HEADER": return WidgetModel
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
                        width: widget.width,
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
                        width: widget.width,
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
            default:

                break;
        }
    }

    function sortWidget(pageId, start, end){
        start = parseInt(start);
        end = parseInt(end);
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