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
FORMIDABLE = require('formidable');
UTIL = require('util');
CRYPTO = require('crypto');
UTILITY = require('./library/utility'); //registe the utility function
for (i in UTILITY) {
	eval(i + '=' + UTILITY[i]);
}
DB = require('./library/db'); //registe the utility function
REQUIRE_ROOT = process.cwd() + '/'; // require root path(used for require function)
ROOT = './'; // read file root path(used for read file)