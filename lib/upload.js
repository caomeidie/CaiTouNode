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

	this.upload = function(infile, outfile, callback){
		if (callback && typeof(callback) === "function") {
			try{
				if(FS.existsSync(infile.path)){
					if(this.max_size < infile.size){
						throw new Error('上传的文件大小超过限制！');
					}
					if(this.allow_type.length != 0 && !this.allow_type.indexOf(infile.type)){
						throw new Error('不允许上传的文件类型！');
					}
					var file_stream = FS.readFileSync(infile.path);
					if(file_stream){
						FS.writeFile(outfile, file_stream, (err) => {
							if (err){
								throw err;
							}else{
								FS.unlink(infile.path);
								callback(false);
							}
						});
					}else{
						throw new Error('上传的文件不存在！');
					}
				}else{
					throw new Error('上传的文件不存在！');
				}
			}catch(err){
				callback(err);
			}
		}
	};
}

module.exports = new upload();