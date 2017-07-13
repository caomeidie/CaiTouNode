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
		var file_path = './bbb.jpg';
		upload.set_size(500);
		upload.upload(POST.bbb,file_path,(err)=>{
			if(!err){
				console.log('success');
			}else{
				console.log('faild');
			}
		});
		return '';
	}
}

module.exports = indexController;