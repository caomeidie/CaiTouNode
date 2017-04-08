/**
 * @desc:common config file
 * @author:Henry Lee
 * @create date:2017/04/06
 *
 * */
require('./core');
var config = {
	//base setting
	port : 8888,
	//develop setting
	debug : true, //debug setting

	//path setting
	libPath : ROOT+'lib/', //lib path(core path)
	uploadPath : ROOT+'upload/', //upload path
 	appPath : ROOT+'app/', //app path(web base path)
	publicPath : ROOT+'public/', //public path(eg:css,js,image)
	
	//router setting
	defaultModule : 'home',
	modulePrefix: 'm',
	controllerPrefix: 'c',
	actionPrefix : 'a',
	defaultModule : 'home',
	defaultController : 'index',
	defaultAction : 'index'
};
module.exports = config;
