

module.exports = function (app, model) {

  app.post('/api/user/:userId/website',createWebsite);
  app.get('/api/user/:userId/website', findWebsitesForUser);
  app.get('/api/website/:websiteId', findWebsiteById);
  app.put('/api/website/:websiteId', updateWebsite);
  app.delete('/api/website/:websiteId', removeWebsite);



  function createWebsite(req, res) {
    var website = req.body;
    var uid = req.params.userId;
    model.websiteModel.createWebsiteForUser(uid, website).then(
      function (newWebsite) {
        res.json(newWebsite);
      })
  }


  function removeWebsite(req, res) {
    var wid = req.params.websiteId;
    model.websiteModel.deleteWebsite(wid).then(
      function (status) {
        res.sendStatus(200);
      },
      function (error) {
        res.sendStatus(400).send(error);
      }
      )
  }



  function updateWebsite(req, res) {
    var website = req.body;
    var wid = req.params.websiteId;
    model.websiteModel.updateWebsite(wid, website).then(
      function(status){
        res.sendStatus(200);
      },
      function(error){
        res.sendStatus(400).send(error);
      }
      );
  }

  function findWebsiteById(req,res) {
    var wid = req.params.websiteId;
    model.websiteModel.findWebsiteById(wid).then(
      function(website){
        if(website){
          res.send(website);
        }
        else{
          res.send('0');
        }
      },
      function(error){
        res.sendStatus(400).send(error);
      }
      );
  }


  function findWebsitesForUser(req, res) {
    model.websiteModel.findWebsitesForUser(req.params.userId).then(
      function (websites) {
        if(websites){
          res.json(websites);
        }
        else{
          res.send('0');
        }
      },
      function(error){
        res.sendStatus(400).send(error);
      }
      );

  }

}