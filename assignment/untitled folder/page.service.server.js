module.exports = function (app) {

  var pages = [
    { "_id": 321, "name": "Post 1", "websiteId": 456, "description": "Lorem" },
    { "_id": 432, "name": "Post 2", "websiteId": 456, "description": "Lorem" },
    { "_id": 543, "name": "Post 3", "websiteId": 456, "description": "Lorem" }
    ];


    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);


    function deletePage(req, res) {
        var pid = parseInt(req.params.pageId);
        for(var p in pages) {
            if(pages[p]._id == pid) {
                pages.splice(p,1);
            }
        }
        res.send(200);
    }



    function updatePage(req, res) {
        var updatedpage = req.body;
        var pid = parseInt(req.params.pageId);
        for(var p in pages) {
            if(pages[p]._id == pid) {
                pages[p] = updatedpage;
            }
        }
        res.send(200); 
    }


    function createPage(req, res) {
        var page = req.body;
        page._id = (new Date()).getTime();
        pages.push(page);
        res.send(page);
    }

    //finid page by id
    function findPageById(req,res) {
        var pid = parseInt(req.params.pageId);                     
        for (var p in pages) {
            if (pages[p]._id === pid) {
                res.send(pages[p]);
                return;
            }
        }
        res.send('0');
    }


    //findallPagesforwebsite
    function findAllPagesForWebsite(req, res) {
        var wid = req.params.websiteId;
        var result = [];
        for(var p in pages) {
            if(pages[p].websiteId === parseInt(wid)) {
                result.push(pages[p]);
            }
        }
        res.send(result);
        return;
    }
}