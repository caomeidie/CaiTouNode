var upload = require(config.libPath+'upload');
var common = require('./common');
//var mysql = require('mysql');
var indexController = function(){
	common.indexAction();
	this.loginAction = function(){
		var sys_name = '小馒头管理系统';
		cookie('name','xiaomimi');
		temp.assign({sys_name:sys_name});
		var result = temp.display();
		return result;
	};

	this.testAction = function(){
		var result = temp.display();
		console.log(getCookie('name'));
		return result;
	};

	this.postloginAction = function(){
		var file_path = './ccc.jpg';
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