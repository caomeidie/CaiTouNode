var upload = require(config.libPath+'upload');
var common = require('./common');
//var mysql = require('mysql');
var indexController = function(web, temp){
	//var C = new controller(req, resp);
	common.indexAction();
	this.indexAction = function(){
		var sys_name = '小馒头管理系统';
		var opt = new Array();
		opt['httpOnly'] = true;
		web.setCookie('name','xiaomimi',opt);
		web.setCookie('name2','xiaomimi2',opt);
		web.setSession('name2','xiaomimi2',opt);
		// var arr = new Array();
		// arr['name4'] = 'xiaomimi4';
		// arr['name5'] = 'xiaomimi5';
		// arr['name6'] = 'xiaomimi6';
		web.setCookie(arr);
		web.unsetCookie();
		console.log(web.getCookie());
		//console.log(web.getCookie('name4'));
		temp.assign({sys_name:sys_name});
		var result = temp.display();
		return result;
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