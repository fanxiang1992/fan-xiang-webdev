module.exports = function (app) {
  var websites = [
    { "_id": 123, "name": "Facebook",    "developerId": 456, "description": "Lorem" },
    { "_id": 234, "name": "Tweeter",     "developerId": 456, "description": "Lorem" },
    { "_id": 456, "name": "Gizmodo",     "developerId": 456, "description": "Lorem" },
    { "_id": 567, "name": "Tic Tac Toe", "developerId": 123, "description": "Lorem" },
    { "_id": 678, "name": "Checkers",    "developerId": 123, "description": "Lorem" },
    { "_id": 789, "name": "Chess",       "developerId": 234, "description": "Lorem" }
    ];

    app.post('/api/user/:userId/website',createWebsite);
    app.get('/api/user/:userId/website', findWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function deleteWebsite(req, res) {
        var wid = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id == wid) {
                websites.splice(w,1);
            }
        }
        res.send(200);
    }

    function updateWebsite(req, res) {
        var web = req.body;
        var wid = parseInt(req.params.websiteId);
        for(var w in websites) {
            if(websites[w]._id == wid) {
                websites[w] = web;
            }
        }
        res.send(200); 
    }

    function findWebsiteById(req,res) {
        var wid = req.params.websiteId;
        for (var w in websites) {
            if (websites[w]._id === parseInt(wid)) {
                res.send(websites[w]);
                return;
            }
        }
        res.send('0');
    }


    function findWebsitesForUser(req, res) {
        var uid = req.params.userId;
        var result = [];
        for(var w in websites) {
            if(websites[w].developerId === parseInt(uid)) {
                result.push(websites[w]);
            }
        }
        res.send(result);
        return;
    }


    function createWebsite(req, res) {
        var website = req.body;
        website._id = (new Date()).getTime();
        websites.push(website);
        res.send(website);
    }


}