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
	ext : 'js',
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
 	appPath : REQUIRE_ROOT+'app/', //require app path(require app file base path)
 	fsAppPath : ROOT+'app/', //app path for fs api(like read or write)
	publicPath : '/'+ROOT+'public/', //public path(eg:css,js,image)
	controllerPathname : 'controller', 
	viewPathname : 'view', 

	//router setting
	modulePrefix : 'm',
	controllerPrefix: 'c',
	actionPrefix : 'a',

	//default router param setting
	defaultModule : MODULE_NAME,
	defaultController : CONTROLLER_NAME,
	defaultAction : ACTION_NAME,

	//suffix setting
	controller : 'Controller',
	action : 'Action',
	model : 'Model',

	//template setting
	tempType : 'ejs', //default is ejs templates

	//view param setting(eg:css,js,img)
	tempParam : {}
};
module.exports = config;
