const BaseService = require('../Services/BaseService');
const RequestQueryModel = require('../Models/RequestQueryModel');
module.exports = function (app, authenticate, authorize) {
    
    // Get records according to page by page number 
    app.get('/Student',authenticate, authorize, async function(req,res){
        let studentService = new BaseService('studentinfo');
        let reqobj = JSON.stringify(req.headers);
        console.log("reqobj " + reqobj);
        let requestQueryModel = req.headers["requestquerymodel"];
        let requestModelQuery = new RequestQueryModel();
        console.log(JSON.parse(requestQueryModel));
        requestModelQuery.pageInfo.page_number = (JSON.parse(requestQueryModel)).pageInfo.page_number;
        requestModelQuery.pageInfo.page_size = (JSON.parse(requestQueryModel)).pageInfo.page_size;
        const size = requestModelQuery.pageInfo.page_size;
        const page = requestModelQuery.pageInfo.page_number;
        let responseModel = await studentService.getRecordByPageNo(size, page);
        // console.log(responseModel);
        res.status(200).send(responseModel);
    });

    app.get('/Student/all', authenticate, authorize, async function (req, res) {
        let studentService = new BaseService('studentinfo');
        console.log(studentService.getAll());
        let dataCollection = await studentService.getAll();

        console.log(dataCollection);
        res.status(200).send(dataCollection);
    });

    // Single Get Request with id
    app.get('/Student/:id', authenticate, authorize, async function (req, res) {
        //    res.send(studentDetails)
        let studentService = new BaseService('studentinfo');
        let dataCollection = await studentService.getRecordById(req.params.id);

        console.log(dataCollection);
        res.status(200).send(dataCollection);
    });


    // Route for adding new student into table
    app.post('/Student', authenticate, authorize, async function (req, res) {
        let studentService = new BaseService('studentinfo');
        studentService.createRecord(req.body);
        res.send("Student Record added to the database!");
    });
    // Route for updating detail of existing student into table
    app.put('/Student/:id', async function (req, res) {
        let studentService = new BaseService('studentinfo');
        await studentService.updateRecord(req.params.id, req.body);
        res.send(`The student with id: ${req.params.id} is updated!`)

    });
    // Route for deleting student from table
    app.delete('/Student/:id', function (req, res) {
        let studentService = new BaseService('studentinfo');
        studentService.deleteRecord(req.params.id);
        res.send(`The student with id: ${req.params.id} is deleted!`)
    });

}