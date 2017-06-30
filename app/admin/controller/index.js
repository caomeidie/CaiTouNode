util = require('util');
var indexController = function(){
	this.loginAction = function(viewpath){
		var filename = viewpath+'login.html';
		var sys_name = '小馒头管理系统';
		temp.assign({sys_name:sys_name});
		var result = temp.display();
		return result;
	};

	this.testAction = function(viewpath){
		var result = temp.display();
		return result;
	};
}

module.exports = indexController;