var userModel = function() {
	this.userAll = function(callback){
		DB.select("select * from tll_user", function(err,results,fields){  
    		callback(err,results,fields);
		});
	}
}

module.exports = new userModel();