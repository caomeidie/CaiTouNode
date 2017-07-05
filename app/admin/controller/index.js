var upload = require(config.libPath+'upload');
var gm = require('gm');  
var indexController = function(){
	this.loginAction = function(){
		var sys_name = '小馒头管理系统';
		temp.assign({sys_name:sys_name});
		var result = temp.display();
		return result;
	};

	this.testAction = function(){
		var result = temp.display();
		return result;
	};

	this.postloginAction = function(){
		var file_path = './aaa.png';
		var test = gm(file_path).resize('200', '200').stream(function(err, stdout, stderr) {
                stdout.pipe(FS.createWriteStream("./ccc.png"));
            });
		// imageMagick(file_path).resize(150, 150, '!').autoOrient().write('./bbb.png', function(err){  
  //           if (err) {  
  //               console.log(err);
  //           }
  //       });
		// upload.set_size(50);
		// upload.upload(POST.bbb,file_path);
		return '';
	}
}

module.exports = indexController;