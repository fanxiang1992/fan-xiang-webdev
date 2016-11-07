module.exports = function (app) {

  var widgets = [
    { "_id": 123, "widgetType": "HEADING", "pageId": 321, "size": 2, "text": "GIZMODO"},
    { "_id": 234, "widgetType": "HEADING", "pageId": 321, "size": 4, "text": "Lorem ipsum"},
    { "_id": 345, "widgetType": "IMAGE", "pageId": 321, "width": "100%",
    "url": "http://lorempixel.com/400/200/"},
    { "_id": 456, "widgetType": "HTML", "pageId": 321, "text": "<p>Lorem ipsum</p>"},
    { "_id": 567, "widgetType": "HEADING", "pageId": 321, "size": 4, "text": "Lorem ipsum"},
    { "_id": 678, "widgetType": "YOUTUBE", "pageId": 321, "width": "50%",
    "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": 789, "widgetType": "HTML", "pageId": 321, "text": "<p>Lorem ipsum2</p>"}
    ];

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.get('/api/page/:pageId/widget',findAllWidgetsForPage);
    app.get('/api/widget/:widgetId',findWidgetById);
    app.post('/api/page/:pageId/widget',createWidget)
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/page/:pageId/widget", reorderWidget);

    function uploadImage(req, res) {
      var widgetId      = req.body.widgetId;
      var width         = req.body.width;
      var myFile        = req.file;
      var originalname  = myFile.originalname; // file name on user's computer
      var filename      = myFile.filename;     // new file name in upload folder
      var path          = myFile.path;         // full path of uploaded file
      var destination   = myFile.destination;  // folder where file is saved to
      var size          = myFile.size;
      var mimetype      = myFile.mimetype;
      var userId = req.body.userId;
      var websiteId = req.body.websiteId;
      var pageId = req.body.pageId;

      for (var w in widgets) {
        if (widgets[w]._id === parseInt(widgetId)) {
          widgets[w].url = "/uploads/" + filename;
        }
      }
      res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
    }

    function reorderWidget(req, res) {
      var pageId = req.params.pageId;
      var start = req.query["start"];
      var end = req.query["end"];
      if (start && end) {
        console.log(start + "    " + end);
      }
    }

    function deleteWidget(req, res) {
        var wigid = parseInt(req.params.widgetId);
        for(var w in widgets) {
            if(widgets[w]._id == wigid) {
                widgets.splice(w,1);
            }
        }
        res.send(200);

    }

    function updateWidget(req, res) {
        var updatedwidget = req.body;
        var wigid = parseInt(req.params.widgetId);
        for(var w in widgets) {
            if(widgets[w]._id == wigid) {
                widgets[w] = updatedwidget;
            }
        }
        res.send(200); 
    }



    //function createWidget
    function createWidget(req, res) {
        var widget = req.body;
        widget._id = (new Date()).getTime();
        widgets.push(widget);
        res.send(widget);
    }

    //function find widget by id
    function findWidgetById(req, res) {
        var wigid = parseInt(req.params.widgetId);
        for (var w in widgets) {
            if (widgets[w]._id == wigid) {
                res.send(widgets[w]);
                return;
            }
        }
        res.send('0');
    }

    //function find all widgetse for page
    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pageId;
        var result = [];
        for(var w in widgets) {
            if(widgets[w].pageId == parseInt(pid)) {
                result.push(widgets[w]);
            }
        }
        res.send(result);
        return;
    }



}