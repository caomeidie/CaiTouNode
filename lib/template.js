var template = function(){
	this.assign = function(data){
		this.dataObj = Object.assign(data, config.tempParam);
	};
	this.display = function(filename){
		switch (config.tempType)
		{
			case 'ejs':
				var content = FS.readFileSync(filename, 'utf8');
				console.log(this.dataObj);
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

module.exports = new template();