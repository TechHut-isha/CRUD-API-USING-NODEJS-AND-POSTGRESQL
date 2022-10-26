const BaseService = require('../Services/BaseService');
const RequestQueryModel = require('../Models/RequestQueryModel');
module.exports = function (app, authenticate, authorize) {
    
    // Get records according to page by page number 
    app.get('/Course',authenticate, authorize, async function(req,res){
        let courseService = new BaseService('courseinfo');
        let reqobj = JSON.stringify(req.headers);
        console.log("reqobj " + reqobj);
        let requestQueryModel = req.headers["requestquerymodel"];
        let requestModelQuery = new RequestQueryModel();
        console.log(JSON.parse(requestQueryModel));
        requestModelQuery.pageInfo.page_number = (JSON.parse(requestQueryModel)).pageInfo.page_number;
        requestModelQuery.pageInfo.page_size = (JSON.parse(requestQueryModel)).pageInfo.page_size;
        const size = requestModelQuery.pageInfo.page_size;
        const page = requestModelQuery.pageInfo.page_number;
        let responseModel = await courseService.getRecordByPageNo(size, page);
        // console.log(responseModel);
        res.status(200).send(responseModel);
    });

    app.get('/Course/all', authenticate, authorize, async function (req, res) {
        let courseService = new BaseService('courseinfo');
        console.log(courseService.getAll());
        let dataCollection = await courseService.getAll();

        console.log(dataCollection);
        res.status(200).send(dataCollection);
    });

    // Single Get Request with id
    app.get('/Course/:id', authenticate, authorize, async function (req, res) {
        //    res.send(studentDetails)
        let courseService = new BaseService('courseinfo');
        let dataCollection = await courseService.getRecordById(req.params.id);

        console.log(dataCollection);
        res.status(200).send(dataCollection);
    });


    // Route for adding new student into table
    app.post('/Course', authenticate, authorize, async function (req, res) {
        let courseService = new BaseService('courseinfo');
        courseService.createRecord(req.body);
        res.send("Course Record added to the database!");
    });
    // Route for updating detail of existing student into table
    app.put('/Course/:id', async function (req, res) {
        let courseService = new BaseService('courseinfo');
        await courseService.updateRecord(req.params.id, req.body);
        res.send(`The Course with id: ${req.params.id} is updated!`)

    });

    // Route for deleting student from table
    app.delete('/Course/:id', function (req, res) {
        let courseService = new BaseService('courseinfo');
        courseService.deleteRecord(req.params.id);
        res.send(`The Course with id: ${req.params.id} is deleted!`)
    });

}