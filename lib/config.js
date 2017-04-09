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
	delimiter : '/',
	//develop setting
	debug : true, //debug setting

	//path setting
	libPath : ROOT+'lib/', //lib path(core path)
	uploadPath : ROOT+'upload/', //upload path
 	appPath : ROOT+'app/', //app path(web base path)
	publicPath : ROOT+'public/', //public path(eg:css,js,image)
	controllerPathname : 'controller', 

	//router setting
	modulePrefix: 'm',
	controllerPrefix: 'c',
	actionPrefix : 'a',
	defaultModule : 'home',
	defaultController : 'index',
	defaultAction : 'index',

	//suffix setting
	controller : 'Controller',
	action : 'Action'
};
module.exports = config;
