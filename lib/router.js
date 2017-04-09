var config = require('./config');
var img_arr = new Array("jpg","bmp","gif","ico","png");
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
	getHtml(router);
	/*console.log(router);
	var module = router[0];
	var controller = router[1];
	var action = router[2];
	console.log(router[0]);
	console.log(query_arr);*/
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

function getHtml(path){
	var filename = path[1];
	if(filename != ""){
		var ext_arr = filename.split(".");
		var ext = ext_arr.pop();
		if(img_arr.indexOf(ext) != -1){
			fs.readFile(filename, 'binary', function (err, data) {
				if (err) {
					console.log(err);
					resp.writeHead(404, {'Content-Type': 'text/html'});
				}else{	         
					resp.writeHead(200, {'Content-Type': 'image/'+ext});	
					resp.write(data, 'binary');		
				}
				resp.end();
			});	
		}else{
			var filepath = config.appPath+path[0]+config.delimiter+config.controllerPathname+config.delimiter+filename;
			var file = require(filepath);
			var file_obj = new file();
			var action = path[2]+config.action;
			file_obj[action]();
		}
	}else{
		resp.writeHead(404,{'Content-Type':'text/html'});
		resp.write('您访问的页面不存在！');
		resp.end();
	}
}

function getQuery(query){
	return querystring.parse(query);
}
module.exports=Router;
