config = require('./config');
netConfig = require('./net_config');
var Router=function(){
	this.getServer = function(){
		return HTTP.createServer(Server).listen(config.port);
	};
};

function Server(req, resp){
	try{
		var urlObj = URL.parse(req.url);
		var query = urlObj.query;
		GET = getQuery(query);
		if(req.method.toLowerCase() == 'post'){
			IS_POST = true;
		}else{
			IS_GET = true;
		}
		var pathname = urlObj.pathname;
		if(isStatic(pathname)){
			router = new Array(pathname);
			getHtml(router, req, resp);
		}else{

			router = getRouter(pathname);
			//merge the core config file with the app config file
			var config_file = MODULE_NAME+'/config/config.js';
			var fs_config_app_path = config.fsAppPath+config_file;
			var config_app_path = config.appPath+config_file;
			FS.access(fs_config_app_path, FS.constants.F_OK | FS.constants.R_OK, (err) => {
				if(!err){
					var config_app = require(config_app_path);
					Object.assign(config, config_app);
					//return html response
					if(IS_POST){
						// get post params
						if(req.headers['content-type'] == 'application/x-www-form-urlencoded'){
							var post_query = '';
							req.on('data', function(chunk){
								post_query += chunk;
								POST = Object.assign(POST, QUERYSTRING.parse(post_query));
						    	getHtml(router, req, resp);
						    });
						}else if(req.headers['content-type'].indexOf('multipart/form-data') >= 0){
							var form = new FORMIDABLE.IncomingForm(); 
						    form.parse(req, function(err, fields, files) {
						    	POST = Object.assign(fields, files);
						    	getHtml(router, req, resp);
						    });
						}
					}else{
						getHtml(router, req, resp);
					}
				}
			});
		}
	}catch(err){
		var html = '(T ^ T)~ '+err.code+':'+err.message;
		resp.writeHead(400, {'Content-Type': 'text/html'});
		resp.write(html);
		resp.end();
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
	try{
		if(path.length == 3){
			//handle the MVC module request
			var controller_filename = path[0]+config.delimiter+config.controllerPathname+config.delimiter+path[1];
			var controller_path = config.appPath+controller_filename;
			var fs_controller_path = config.fsAppPath+controller_filename+'.'+config.ext;
			//if the controller file is exist
			if(FS.existsSync(fs_controller_path)){
				req.headers.cookie = parseCookie(req.headers.cookie) || [];
				req.headers.cookie_set = [];
				var temp = require('./template');
				var web = require(config.libPath+'web');
				var web_obj = new web(req, resp);
				var file = require(controller_path);
				var action = path[2]+config.action;
				var file_obj = new file(web_obj, temp);
				var html = file_obj[action]();
				//set cookies into html head
				var cookie_set = [];
				for(key in req.headers.cookie_set){
					cookie_set.push(req.headers.cookie_set[key]);
				}
				resp.setHeader('Set-Cookie',cookie_set);
				resp.writeHead(200, {'Content-Type': 'text/html'});	
				resp.write(html);
				resp.end();
			}else{
				var err = new Error('(T ^ T)~ CONTROLLER NOT FOUND');
				err.code = 'NOT_FOUND';
				throw err;
			}
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
	}catch(err){
		var html = '(T ^ T)~ UNKNOW ERROR';
		if(err.code == 'NOT_FOUND'){
			if(!err.message){
				html = '(T ^ T)~ FILE NOT FOUND';
			}else{
				html = err.message;
			}
			resp.writeHead(404, {'Content-Type': 'text/html'});	
		}else{
			err.code = err.code || '';
			html = '(T ^ T)~ '+err.code+':'+err.message;
			resp.writeHead(400, {'Content-Type': 'text/html'});	
		}
		resp.write(html);
		resp.end();
	}
}

//parse the string into object
function getQuery(query){
	return QUERYSTRING.parse(query);
}

function parseCookie(cookie){
	if(!cookie){
		return false;
	}else{
		var cookie_arr = [];
		var arr = cookie.split(';');
		for(items in arr){
			var item = [];
			item = arr[items].split('=');
			cookie_arr[item[0].trim()] = item[1];
		}
		return cookie_arr;
	}
}

module.exports=Router;