/**
 * @desc:common function library
 * @author:Henry Lee
 * @create date:2017/07/21
 *
 * */
var utility = function(){
	//md5 encrypt
	this.md5 = function(text){
		return CRYPTO.createHash('md5').update(text).digest('hex');
	};

	//sha1 encrypt
	this.sha1 = function(text){
		return CRYPTO.createHash('sha1').update(text).digest('hex');
	};

	//set cookie
	this.cookie = function(cookie_name, cookie_val){
		if(!cookie_val && cookie_name){
			delete COOKIE[cookie_name];
		}else{
			var obj = {};
			obj[cookie_name] = cookie_val;
			COOKIE = Object.assign(COOKIE, obj);
		}
	}

	//get cookie
	this.getCookie = function(cookie_name){
		return COOKIE[cookie_name] || '';
	}

};
module.exports = new utility();