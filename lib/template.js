var template = function(){
	//merge template's data with template's config params
	this.assign = function(data){
		this.dataObj = Object.assign(data, config.tempParam);
	};

	//display with view's head and foot which build in layout dir.
	this.display = function(filename){
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

	//display without view's head and foot which build in layout dir.
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

module.exports = new template();