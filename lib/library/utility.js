/**
 * @desc:utility function library
 * @author:Henry Lee
 * @create date:2017/07/21
 *
 * */
var utility = function(){
	/**
	 * md5 encrypt
	 * @param  {[String]} text [The text which should be encrypt]
	 * @return {[String]}
	 */
	this.md5 = function(text){
		return CRYPTO.createHash('md5').update(text).digest('hex');
	};

	/**
	 * sha1 encrypt
	 * @param  {[String]} text [The text which should be encrypted]
	 * @return {[String]}
	 */
	this.sha1 = function(text){
		return CRYPTO.createHash('sha1').update(text).digest('hex');
	};

	/**
	 * Set or get cookie
	 * eg. cookie() //get all cookies
	 * eg. cookie(cookie_name) //get cookie if cookie_name is String
	 * eg. cookie(cookie_name) //set cookie if cookie_name is Array
	 * eg. cookie(cookie_name, cookie_val) //set cookie which named [cookie_name]
	 * 
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

	/**
	 * delete cookie
	 * delete cookie if the cookie_name is not null, otherwise delete all cookies.
	 * @param  {[String]} cookie_name [The name of cookie]
	 * @return {[null]}
	 */
	this.unsetCookie = function(cookie_name){
		if(!cookie_name){
			COOKIE = {};
		}else{
			delete COOKIE[cookie_name];
		}
	}

	this.sessionStart = function(){
		if(!SESSION_ID){
			var timestamp = Date.now();
			var ip = this.getClientIp();
			var rand = this.random(1000, 9999);

			switch (netConfig.sessionHashFunction)
			{
				case 0:
					SESSION_ID = md5(timestamp+ip+rand);
					break;
				case 1:
					SESSION_ID = sha1(timestamp+ip+rand);
					break;
				default:
					SESSION_ID = md5(timestamp+ip+rand);
			}
		}		

		FS.access(netConfig.sessionSavePath, (err) => {
			if(err){
				FS.mkdirSync(netConfig.sessionSavePath);
			}
			FS.open(netConfig.sessionSavePath+'sess_'+SESSION_ID, 'w+', (err, fd) => {
				return err ? false : true;
			});
		});
	}

	this.session = function(){
	}
	
	/**
	 * Get remote client ip
	 * @return {[String]}
	 */
	this.getClientIp = function() {
	    return REQUEST.headers['x-forwarded-for'] ||
	    REQUEST.connection.remoteAddress ||
	    REQUEST.socket.remoteAddress ||
	    REQUEST.connection.socket.remoteAddress;
	};

	this.random = function(min_num,max_num){
		var range = max_num - min_num;
		var rand = Math.random();
		var num = min_num + Math.round(rand * range);
		return num;
	}

};
module.exports = new utility();