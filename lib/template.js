var template = function(){
	this.dataObj = {};
	this.data = function(data){
		Object.assign(this.dataObj, data);
	};
	this.display = function(filename){
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
	this.particle = function(filename){
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