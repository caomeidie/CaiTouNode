/**
 * @desc:utility function library
 * @author:Henry Lee
 * @create date:2017/07/21
 *
 * */
var utility = function() {
	/**
	 * md5 encrypt
	 * @param  {[String]} text [The text which should be encrypt]
	 * @return {[String]}
	 */
	this.md5 = function(text) {
		return CRYPTO.createHash('md5').update(text).digest('hex');
	};

	/**
	 * sha1 encrypt
	 * @param  {[String]} text [The text which should be encrypted]
	 * @return {[String]}
	 */
	this.sha1 = function(text) {
		return CRYPTO.createHash('sha1').update(text).digest('hex');
	};

	/**
	 * Create a random number between min_num and max_num
	 * @param  {[Int]} min_num
	 * @param  {[Int]} max_num
	 * @return {[Int]}
	 */
	this.random = function(min_num, max_num) {
		var range = max_num - min_num;
		var rand = Math.random();
		var num = min_num + Math.round(rand * range);
		return num;
	}

	/**
	 * Return the local time
	 * @param  {[String]} date_str [the utc time string]
	 * @param  {[Int]} type     [the type of time.default:Y-M-D H:I:S, 1:Y-M-D, 2:H:I:S]
	 * @return {[String]}
	 */
	this.ldate = function(date_str, type) {
		if (!type) {
			return !date_str ? new Date().toLocaleString() : new Date(date_str).toLocaleString();
		} else {
			var cday = !date_str ? new Date().toLocaleString() : new Date(date_str).toLocaleString();
			var cday_obj = new Date(cday);
			switch (type) {
				case 1:
					cday = cday_obj.getFullYear() + '-' + cday_obj.getMonth() + '-' + cday_obj.getDate();
					break;
				case 2:
					cday = cday_obj.getHours() + ':' + cday_obj.getMinutes() + ':' + cday_obj.getSeconds();
					break;
				default:
					cday;
			}
			return cday;
		}

	}

	/**
	 * Return the local timestamp(millisecond) by date_str.
	 * @param  {[String]} date_str [the string time]
	 * @return {[Int]}
	 */
	this.lmdate = function(date_str) {
		return !date_str ? new Date(this.ldate()).getTime() : new Date(this.ldate(date_str)).getTime();
	}

	/**
	 * Return the timestamp(millisecond) by date_str.
	 * @param  {[String]} date_str [the string time]
	 * @return {[Int]}
	 */
	this.mdate = function(date_str) {
		return !date_str ? new Date().getTime() : new Date(date_str).getTime();
	}

	/**
	 * If the obj is Array
	 * @param  {Object}  obj [the object which will be judged]
	 * @return {Boolean}
	 */
	this.isArray = function(obj) {
		return (typeof obj == 'object') && obj.constructor == Array;
	}

	/**
	 * If the obj is String
	 * @param  {Object}  obj [the object which will be judged]
	 * @return {Boolean}
	 */
	this.isString = function(str) {
		return (typeof str == 'string') && str.constructor == String;
	}

	/**
	 * If the obj is Number
	 * @param  {Object}  obj [the object which will be judged]
	 * @return {Boolean}
	 */
	this.isNumber = function(obj) {
		return (typeof obj == 'number') && obj.constructor == Number;
	}

	/**
	 * If the obj is Date
	 * @param  {Object}  obj [the object which will be judged]
	 * @return {Boolean}
	 */
	this.isDate = function(obj) {
		return (typeof obj == 'object') && obj.constructor == Date;
	}

	this.htmlSpecialChars = function(str, strict){
		if (!strict) {
			str = str.replace(/&/g, '&amp;');  
		    str = str.replace(/</g, '&lt;');  
		    str = str.replace(/>/g, '&gt;');  
		    str = str.replace(/"/g, '&quot;');  
		    str = str.replace(/'/g, '&#039;');  
		    return str;
		} else {
			var s = "";  
	        if (str.length == 0) return "";  
	        for   (var i=0; i<str.length; i++)  
	        {  
	            switch (str.substr(i,1))  
	            {  
	                case "<": s += "&lt;"; break;  
	                case ">": s += "&gt;"; break;  
	                case "&": s += "&amp;"; break;  
	                case " ":  
	                    if(str.substr(i + 1, 1) == " "){  
	                        s += " &nbsp;";  
	                        i++;  
	                    } else s += " ";  
	                    break;  
	                case "\"": s += "&quot;"; break;  
	                case "\n": s += "<br>"; break;  
	                default: s += str.substr(i,1); break;  
	            }  
	        }  
	        return s; 
		}
	}

	/**
	 * Make serialized cookie string
	 * @param  {[Object]} obj [The cookie object which build like key-value]
	 * @param  {[Object]} opt [the cookie ext options]
	 * @return {[String]}
	 */
	function serializeCookie(obj, opt) {
		var params = [];
		for (var cookie in obj) {
			params.push(cookie + '=' + obj[cookie]);
		}

		opt = opt || {};
		if (opt.maxAge) {
			params.push('Max-Age=' + opt.maxAge);
		}
		if (opt.domin) {
			params.push('Domin=' + opt.domin);
		}
		if (opt.path) {
			params.push('Path=' + opt.path);
		}
		if (opt.expires) {
			params.push('Expires=' + opt.expires.toUTCString());
		}
		if (opt.httpOnly) {
			params.push('HttpOnly');
		}
		if (opt.secure) {
			params.push('Secure');
		}
		return params.join(';');
	}
};
module.exports = new utility();