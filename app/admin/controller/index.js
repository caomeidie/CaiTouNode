util = require('util');
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
		return POST;
	}
}

module.exports = indexController;