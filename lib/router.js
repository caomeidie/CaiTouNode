config = require('./config');
template = require('./template');
temp = new template();
var Router=function(){
	this.getServer = function(){
		return HTTP.createServer(Server).listen(config.port);
	};
};

function Server(req, resp){
	var urlObj = URL.parse(req.url);
	var query = urlObj.query;
	var query_arr = getQuery(query);
	var pathname = urlObj.pathname;
	if(isStatic(pathname)){
		var router = new Array(pathname);
	}else{
		var router = getRouter(pathname);
	}
	getHtml(router, req, resp);
}

function isStatic(pathname){
	var path_arr = pathname.split(".");
	if(path_arr.length > 1){
		return true;
	}else{
		return false;
	}
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

function getHtml(path, req, resp){
	if(path.length == 3){
		//handle the MVC module request
		var filepath = config.appPath+path[0]+config.delimiter+config.controllerPathname+config.delimiter+path[1];
		var viewpath = config.requireAppPath+path[0]+config.delimiter+config.viewPathname+config.delimiter;
		var file = require(filepath);
		var file_obj = new file();
		var action = path[2]+config.action;
		var html = file_obj[action](viewpath);
		if(!html){
			resp.writeHead(404, {'Content-Type': 'text/html'});
		}else{
			resp.writeHead(200, {'Content-Type': 'text/html'});	
			resp.write(html);
		}
		resp.end();
	}else if(path.length == 1){
		var filename = ROOT+path[0];
		var ext_arr = path[0].split(".");
		var ext = ext_arr.pop().toLowerCase();
		if(config.imgExt.indexOf(ext) != -1){
			//handle the image file request
			FS.readFile(filename, 'binary', function (err, data) {
				if (err) {
					console.log(err);
					resp.writeHead(404, {'Content-Type': 'text/html'});
				}else{
					if(ext == 'jpg'){
						ext = 'jpeg';
					}
					resp.writeHead(200, {'Content-Type': 'image/'+ext});	
					resp.write(data, 'binary');		
				}
				resp.end();
			});	
		}else if(config.staticExt.indexOf(ext) != -1){
			//handle the css and js file request
			FS.readFile(filename, 'binary', function (err, data) {
				if (err) {
					console.log(err);
					resp.writeHead(404, {'Content-Type': 'text/html'});
				}else{
					if(ext == 'css'){
						resp.writeHead(200, {'Content-Type': 'text/css'});
					}else{
						resp.writeHead(200, {'Content-Type': 'application/javascript'});						
					}	
					resp.write(data, 'binary');		
				}
				resp.end();
			});	
		}
	}else{
		resp.writeHead(404,{'Content-Type':'text/html'});
		resp.write('您访问的页面不存在！');
		resp.end();
	}
}

function getQuery(query){
	return QUERYSTRING.parse(query);
}
module.exports=Router;
