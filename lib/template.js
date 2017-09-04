var template = function(router, req, resp){
	//
	/**
	 * Merge template's data with template's config params
	 * @param  {Object} data [customed config params]
	 */
	this.assign = function(data){
		this.dataObj = Object.assign(data, config.tempParam);
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
				html = EJS.render(content, this.dataObj);
				break;
			default:
				html = EJS.render(content, this.dataObj);
		}
		//set cookies into html head
		var cookie_set = [];
		for (key in req.cookie_set) {
			cookie_set.push(req.cookie_set[key]);
		}
		resp.setHeader('Set-Cookie', cookie_set);
		if (req.isAjax) {
			//ajax request
			resp.writeHead(200, {
				'Content-Type': 'application/json'
			});
		} else {
			//normal request				  
			resp.writeHead(200, {
				'Content-Type': 'text/html'
			});
		}
		resp.write(html);
		resp.end();
	}

	/**
	 * Display without view's head and foot which build in layout dir.
	 * @param  {String} filename [the name of html without ext]
	 * @return {String}
	 */
	this.particle = function(filename){
		if(!filename){
			filename = config.fsAppPath+router[0]+config.delimiter+config.viewPathname+config.delimiter+router[1]+config.delimiter+router[2]+'.html';
		}else{
			filename = config.fsAppPath+router[0]+config.delimiter+config.viewPathname+config.delimiter+router[1]+config.delimiter+filename+'.html';
		}
		switch (config.tempType)
		{
			case 'ejs':
				var content = FS.readFileSync(filename, 'utf8');
				return EJS.render(content, this.dataObj);
				break;
			default:
				return EJS.render(content, this.dataObj);
		}
	}
}

module.exports = template;