module.exports = class Authorization{

    constructor(){

    }

    static authorize(req, res, next){

        console.log('Here you will do your authorization');
        next();
    }
};
