var upload = function(){
	//uploaded file's max size(default 2M)
	this.max_size = 2097152;
	//allowed file mime(eg:png,jpeg,doc,xls...)
	this.allow_type = [];

	//set max size(kilobyte)
	this.set_size = function(size){
		this.max_size = size*1024;
	};

	//set allow type
	this.set_type = function(type){
		this.allow_type = type;
	};

	this.upload = function(infile, outfile){
		if(FS.existsSync(infile.path)){
			if(this.max_size < infile.size){
				return false;
			}
			if(this.allow_type.length != 0 && !this.allow_type.indexOf(infile.type)){
				return false;
			}
			var file_stream = FS.readFileSync(infile.path);
			FS.writeFile(outfile, file_stream, (err) => {
				if (err) throw err;
				FS.unlink(infile.path);
			});
		}else{
			return false;
		}
	};
}

module.exports = new upload();