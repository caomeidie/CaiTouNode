config = require('./config');
temp = require('./template');
var Router=function(){
	this.getServer = function(){
		return HTTP.createServer(Server).listen(config.port);
	};
};

function Server(req, resp){
	var urlObj = URL.parse(req.url);
	var query = urlObj.query;
	GET = getQuery(query);
	var pathname = urlObj.pathname;
	if(isStatic(pathname)){
		router = new Array(pathname);
		getHtml(router, req, resp);
	}else{
		// get post params
		var post_query = '';
		req.on('data', function(chunk){
			post_query += chunk;
			POST = Object.assign(POST, QUERYSTRING.parse(post_query));
	    });
		router = getRouter(pathname);
		//merge the core config file with the app config file
		var config_file = MODULE_NAME+'/config/config.js';
		var fs_config_app_path = config.fsAppPath+config_file;
		var config_app_path = config.appPath+config_file;
		FS.access(fs_config_app_path, FS.constants.F_OK | FS.constants.R_OK, (err) => {
			if(!err){
				var config_app = require(config_app_path);
				Object.assign(config, config_app);
				getHtml(router, req, resp);
			}
		});
	}
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

	//set current module, controller and action name
	MODULE_NAME = module;
	CONTROLLER_NAME = controller;
	ACTION_NAME = action;
	return new Array(module, controller, action);	
}

function getHtml(path, req, resp){
	if(path.length == 3){
		//handle the MVC module request
		var controller_filename = path[0]+config.delimiter+config.controllerPathname+config.delimiter+path[1];
		var controller_path = config.appPath+controller_filename;
		var fs_controller_path = config.fsAppPath+controller_filename+'.'+config.ext;
		//if the controller file is existent
		if(FS.existsSync(fs_controller_path)){
			var file = require(controller_path);
			var file_obj = new file();
			var action = path[2]+config.action;
			var html = file_obj[action]();
			resp.writeHead(200, {'Content-Type': 'text/html'});	
			resp.write(html);
		}else{
			resp.writeHead(404, {'Content-Type': 'text/html'});
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
		resp.end();
	}
}

function getQuery(query){
	return QUERYSTRING.parse(query);
}
module.exports=Router;
