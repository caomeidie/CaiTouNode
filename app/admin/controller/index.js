var upload = require(config.libPath+'upload');
var common = require('./common');
var controller = require(config.libPath+'controller');
//var mysql = require('mysql');
var indexController = function(req, resp, temp){
	var C = new controller(req, resp);
	common.indexAction();
	this.indexAction = function(){
		var sys_name = '小馒头管理系统';
		//console.log(req.headers.cookie);
		//console.log(this.C.cookie());
		C.cookie('name','xiaomimi');
		console.log(req.headers.cookie);
		//cookie('name2','xiaomimi2');
		//cookie('name3','xiaomimi3');
		// var arr = new Array();
		// arr['name4'] = 'xiaomimi4';
		// arr['name5'] = 'xiaomimi5';
		// arr['name6'] = 'xiaomimi6';
		//cookie(arr);
		//temp.assign({sys_name:sys_name});
		//var result = temp.display();
		//return result;
	};

	this.testAction = function(){
		//session('name','xiaomin');
		var result = temp.display();
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