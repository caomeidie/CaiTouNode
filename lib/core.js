/**
 * @desc:core file
 * @author:Henry Lee
 * @create date:2017/04/06
 *
 * */
HTTP = require('http');
FS = require('fs');
URL = require('url');
QUERYSTRING = require('querystring');
EJS = require('ejs');
REQUIRE_ROOT = '../'; // require root path(used for require() function)
ROOT = './'; // read file root path(used for read file)
MODULE_NAME = 'home'; // current module name(default name is home)
CONTROLLER_NAME = 'index'; // current controller name(default name is index)
ACTION_NAME = 'index'; // current action name(default name is index)