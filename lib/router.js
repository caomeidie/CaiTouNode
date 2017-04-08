var config = require('./config');
var Router=function(){
	this.getServer = function(){
		return http.createServer(Server).listen(config.port);
	};
};

function Server(req, resp){
	var urlObj = url.parse(req.url);
	var pathname = urlObj.pathname;
	var query = urlObj.query;
	var router = getRouter(pathname);
	var query_arr = getQuery(query);
	console.log(router);
	console.log(query_arr);
}

function getRouter(pathname){
	var path_arr = new Array();
	if(pathname.length > 1){
		path_arr = pathname.slice(1).split("/");
	}
        var module = '';
        var controller = '';
        var action = '';
        switch(path_arr.length){
                case 2:
                        module= config.defaultModule;
                        controller = path_arr[0];
                        action = path_arr[1];
                        break;
                case 1:
                        module= config.defaultModule;
                        controller = config.defaultController;
                        action = path_arr[0];
                        break;
                case 0:
                        module= config.defaultModule;
                        controller = config.defaultController;
                        action = config.defaultAction;
                        break;
                default:
                        module= path_arr[0];
                        controller = path_arr[1];
                        action = path_arr[2];
	}
	return new Array(module, controller, action);	
}

function getQuery(query){
	return querystring.parse(query);
}
module.exports=Router;
