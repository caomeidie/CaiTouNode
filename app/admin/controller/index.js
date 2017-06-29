util = require('util');
var indexController = function(){
	this.indexAction = function(viewpath){
		var filename = viewpath+'index.html';
		var sys_name = '小馒头管理系统';
		temp.assign({sys_name:sys_name});
		var result = temp.display(filename);
		return result;
	};
}

module.exports = indexController;