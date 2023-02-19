//IN THIS WE NEED TO EXPORT THE FUNCTION WHICH IS PUBLICALLY AVAILABLE TO ROUTES FILE AND THAT SHOULD RETURN SOMETHING

module.exports.home = function(req,res){
    return res.end('<h1>Express is up for Codeial</h1>');
}


//module.exports.actionName = Function(req,res){}