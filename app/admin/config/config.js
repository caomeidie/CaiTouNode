/**
 * @desc:app config file
 * @author:Henry Lee
 * @create date:2017/05/22
 *
 * */
var config_app = function(module) {
	return {
		//template static files' path
		tempParam: {
			__CSS__: config.publicPath + module + '/css/',
			__JS__: config.publicPath + module + '/js/',
			__IMG__: config.publicPath + module + '/images/',
		}
	};	
};
module.exports = config_app;