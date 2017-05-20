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

	//favicon settting
	favicon : ROOT+'favicon.ico',

	//static file ext setting
	staticExt : ['css', 'js'],

	//img ext setting
	imgExt : ['jpg', 'jpeg', 'png', 'gif', "bmp", "ico", 'tiff', 'raw'],

	//path setting
	libPath : REQUIRE_ROOT+'lib/', //lib path(core path)
	uploadPath : ROOT+'upload/', //upload path
 	appPath : REQUIRE_ROOT+'app/', //require app path(require function file base path)
 	requireAppPath : ROOT+'app/', //require app path(require function file base path)
	publicPath : ROOT+'public/', //public path(eg:css,js,image)
	controllerPathname : 'controller', 
	viewPathname : 'view', 

	//router setting
	modulePrefix : 'm',
	controllerPrefix: 'c',
	actionPrefix : 'a',
	defaultModule : 'home',
	defaultController : 'index',
	defaultAction : 'index',

	//suffix setting
	controller : 'Controller',
	action : 'Action',

	//template setting
	tempType : 'ejs' //default is ejs templates
};
module.exports = config;
