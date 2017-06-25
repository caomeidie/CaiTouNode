/**
 * @desc:app config file
 * @author:Henry Lee
 * @create date:2017/05/22
 *
 * */
var config_app = {
	//template static files' path
	tempParam : {
		__CSS__ : config.publicPath+MODULE_NAME+'/css/',
		__JS__ : config.publicPath+MODULE_NAME+'/js/',
		__IMG__ : config.publicPath+MODULE_NAME+'/img/',
	}
};
module.exports = config_app;
