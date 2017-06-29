var template = function(){
	this.dataObj = {};
	this.data = function(data){
		this.dataObj = data;
	};
	this.display = function(filename){
		switch (config.tempType)
		{
			case 'ejs':
				var content = FS.readFileSync(filename, 'utf8');
				this.dataObj = Object.assign(this.dataObj, config.tempParam);
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