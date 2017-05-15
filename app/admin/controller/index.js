var indexController = function(){
	this.indexAction = function(viewpath){
		var pathname = viewpath+'index.html';
		var content = FS.readFileSync(pathname, 'utf8');
		var sys_name = '小馒头管理系统';
		var result = EJS.render(content, {sys_name:sys_name});

		return result;
	};
}

module.exports = indexController;