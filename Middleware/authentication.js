class Authentication{
    constructor(){

    }

    static authenticate(req,res,next){
        console.log('Here you will do your authentication');
        next(); 
    }
}

module.exports = Authentication;