var template = function(router, req, resp){
	//
	/**
	 * Merge template's data with template's config params
	 * @param  {Object} data [customed config params]
	 */
	this.assign = function(data){
		this.data_obj = Object.assign(data, config.tempParam);
	};

	/**
	 * Display with view's head and foot which build in layout dir.
	 * @param  {String} filename [the name of html without ext]
	 * @return {String}
	 */
	this.display = function(filename){
		if(!filename){
			filename = config.fsAppPath+router[0]+config.delimiter+config.viewPathname+config.delimiter+router[1]+config.delimiter+router[2]+'.html';
		}else{
			filename = config.fsAppPath+router[0]+config.delimiter+config.viewPathname+config.delimiter+router[1]+config.delimiter+filename+'.html';
		}
		var html = '';
		switch (config.tempType)
		{
			case 'ejs':
				var content = FS.readFileSync(filename, 'utf8');
				html = EJS.render(content, this.data_obj);
				break;
			default:
				var content = FS.readFileSync(filename, 'utf8');
				html = EJS.render(content, this.data_obj);
		}
		//set cookies into html head
		var cookie_set = [];
		for (key in req.cookie_set) {
			cookie_set.push(req.cookie_set[key]);
		}
		resp.setHeader('Set-Cookie', cookie_set);
		resp.writeHead(200, {
			'Content-Type': 'text/html'
		});
		resp.write(html);
		resp.end();
	}

	/**
	 * Return result encoded with json format.
	 * @param  {Object} obj [the original data type]
	 * @return {String}
	 */
	this.ajaxReturn = function(data){
		//set cookies into html head
		var cookie_set = [];
		for (key in req.cookie_set) {
			cookie_set.push(req.cookie_set[key]);
		}
		resp.setHeader('Set-Cookie', cookie_set);
		resp.writeHead(200, {
			//'Content-Type': 'text/plain'
			'Content-Type': 'application/json'
		});
		resp.write(JSON.stringify(data));
		resp.end();
	}

	this.error = function(){
		var msg = arguments[0] ? arguments[0] : '';
		var jump_url = arguments[1] ? arguments[1] : 'javascript:history.back(-1);';
		var wait_second = arguments[2] ? arguments[2] : 3;
		var data = {msg:msg, jump_url:jump_url, wait_second:wait_second};
		var html = '';
		switch (config.tempType)
		{
			case 'ejs':
				var content = FS.readFileSync(config.errorLayer, 'utf8');
				html = EJS.render(content, data);
				break;
			default:
				var content = FS.readFileSync(config.errorLayer, 'utf8');
				html = EJS.render(content, data);
		}
		//set cookies into html head
		var cookie_set = [];
		for (key in req.cookie_set) {
			cookie_set.push(req.cookie_set[key]);
		}
		resp.setHeader('Set-Cookie', cookie_set);
		resp.writeHead(200, {
			'Content-Type': 'text/html'
		});
		resp.write(html);
		resp.end();
	}
	this.success = function(data){
		var msg = arguments[0] ? arguments[0] : '';
		var jump_url = arguments[1] ? arguments[1] : 'javascript:history.back(-1);';
		var wait_second = arguments[2] ? arguments[2] : 3;
		var data = {msg:msg, jump_url:jump_url, wait_second:wait_second};
		var html = '';
		switch (config.tempType)
		{
			case 'ejs':
				var content = FS.readFileSync(config.successLayer, 'utf8');
				html = EJS.render(content, data);
				break;
			default:
				var content = FS.readFileSync(config.successLayer, 'utf8');
				html = EJS.render(content, data);
		}
		//set cookies into html head
		var cookie_set = [];
		for (key in req.cookie_set) {
			cookie_set.push(req.cookie_set[key]);
		}
		resp.setHeader('Set-Cookie', cookie_set);
		resp.writeHead(200, {
			'Content-Type': 'text/html'
		});
		resp.write(html);
		resp.end();
	}
}

module.exports = template;