var config = require('./config');
var Func = function(){
	this.getRouter = function(pathname){
		var path_arr = pathname.split("/");
		var module = '';
		var controller = '';
		var action = '';
		switch(path_arr.length){
			case 2:
				module= config.defaultModule;	
				controller = path_arr[0];	
				action = path_arr[1];	
				break;
			case 1:
				module= config.defaultModule;	
				controller = config.defaultController;	
				action = path_arr[0];	
				break;
			case 0:
				module= config.defaultModule;	
				controller = config.defaultController;	
				action = config.defaultAction;	
				break;
			default:
				module= path_arr[0];	
				controller = path_arr[1];	
				action = path_arr[2];	
		}

		return new array(module, controller, action);
	}

}
