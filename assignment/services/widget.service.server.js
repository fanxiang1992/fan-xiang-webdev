

module.exports = function (app, model) {


    var multer = require('multer'); // npm install multer --save
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, __dirname+'/../../public/uploads')
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.mimetype.split("/")[1])
      }
    });
    var upload = multer({ storage: storage });

    app.get('/api/page/:pageId/widget',findAllWidgetsForPage);
    app.get('/api/widget/:widgetId',findWidgetById);
    app.post('/api/page/:pageId/widget',createWidget);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put('/page/:pageId/widget', sortItem);
    app.put('/api/:widgetId/flickr', selectFlickr);


    function selectFlickr(req, res){
      var widgetId = req.params.widgetId;
      var content = req.body;
      model.widgetModel.selectFlicker(widgetId, content.photo).then(
        function(status){
          res.sendStatus(200);
        },
        function(error){
          res.sendStatus(400).send(error);
        });
    }

    function sortItem(req, res) {
      var start = parseInt(req.query.start);
      var end = parseInt(req.query.end);

      var pageId = req.params.pageId;

      model.widgetModel.sortWidget(pageId, start, end).then(
        function(status){
          res.sendStatus(200);
        },
        function(error){
          res.sendStatus(400).send(error);
        });
    }



    function uploadImage(req, res) {
      var userId = req.body.userId;
      var websiteId = req.body.websiteId;
      var pageId = req.body.pageId;
      var widgetId = req.body.widgetId;
      var width = req.body.width;
      var myFile = req.file;

      var originalname = myFile.originalname; // file name on user's computer
      var filename = myFile.filename;     // new file name in upload folder
      var path = myFile.path;         // full path of uploaded file
      var destination = myFile.destination;  // folder where file is saved to
      var size = myFile.size;
      var mimetype = myFile.mimetype;
      var url = "/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

      model.widgetModel.uploadImage(widgetId, filename).then(
        function(image){
          if(image) {
            res.redirect(url);
          }
        },
        function(error){
          console.log("server error")
          res.sendStatus(400).send(error);
        });
    }



    function updateWidget(req, res) {
      var widget = req.body;
      var widgetId = req.params.widgetId;
      model.widgetModel.updateWidget(widgetId, widget).then(
        function(status){
          console.log("success");
          res.sendStatus(200);
        },
        function(error){
          console.log("error");
          res.sendStatus(400).send(error);
        });
    }



    function createWidget(req, res) {
      var widget = req.body;
      var pageId = req.params.pageId;
      model.widgetModel.findAllWidgetsForPage(pageId).then(
        function(widgets){
          if(widgets){
            widget["priority"] = parseInt(widgets.length + 1);
            model.widgetModel.createWidget(pageId, widget).then(
              function(newWidget){
                res.send(newWidget);
              },
              function(error){
                res.sendStatus(400).send(error);
              });
          }
        },
        function(error){
          res.sendStatus(400).send(error);
        });
    }



    function findWidgetById(req, res) {
      var widgetId = req.params.widgetId;
      model.widgetModel.findWidgetById(widgetId).then(
        function(widget){
          if(widget){
            res.send(widget);
          }
          else{
            res.send('0');
          }
        },
        function(error){
          res.sendStatus(400).send(error);
        });
    }

    function findAllWidgetsForPage(req, res) {
      var pageId = req.params.pageId;
      model.widgetModel.findAllWidgetsForPage(pageId).then(
        function(widgets){
          if(widgets){
            res.json(widgets);
          }
          else{
            res.send('0');
          }
        },
        function(error){
          res.sendStatus(400).send(error);
        });
    }

    function deleteWidget(req, res){
      var widgetId = req.params.widgetId;
      model.widgetModel.findWidgetById(widgetId).then(
        function(widget){
          if(widget){
            model.widgetModel.deleteWidget(widgetId).then(
              function(status){
                res.sendStatus(200);
              },
              function(error){
                res.sendStatus(400).send(error);
              });
          }
        },
        function(error){
          res.sendStatus(400).send(error);
        });
    }
}