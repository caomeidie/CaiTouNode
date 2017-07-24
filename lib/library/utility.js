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

	/**
	 * Set or get cookie
	 * @param  {[String or Array]} cookie_name [cookie's key]
	 * @param  {[String or null]} cookie_val  [cookie's value]
	 * @return {[String or Object or null]}
	 */
	this.cookie = function(cookie_name, cookie_val){
		if(!cookie_val && !cookie_name){
			return COOKIE;
		}else if(!cookie_val && cookie_name){
			if(cookie_name instanceof Array){
				var obj = {};
				for(var item in cookie_name) {
					if(!COOKIE[item]){
						obj[item] = cookie_name[item];
					}else{
						COOKIE[item] = cookie_name[item];
					}
				}
				COOKIE = Object.assign(COOKIE, obj);
			}else{
				return COOKIE[cookie_name] || '';
			}
		}else{
			if(!COOKIE[cookie_name]){
				var obj = {};
				obj[cookie_name] = cookie_val;
				COOKIE = Object.assign(COOKIE, obj);
			}else{
				COOKIE[cookie_name] = cookie_val;
			}
		}
	}

	//delete cookie
	this.unsetCookie = function(cookie_name){
		if(!cookie_name){
			COOKIE = {};
		}else{
			delete COOKIE[cookie_name];
		}
	}

};
module.exports = new utility();