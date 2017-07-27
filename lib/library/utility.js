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
		if(netConfig.sessionSaveHandler == 'files'){
			if(!this.cookie(netConfig.sessionName)){
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
	}

	this.session = function(session_name, session_val){
		var session_id = '';
		if(!this.cookie(netConfig.sessionName)){
			//create session_id
			var timestamp = Date.now();
			var ip = this.getClientIp();
			var rand = this.random(1000, 9999);

			switch (netConfig.sessionHashFunction)
			{
				case 0:
					session_id = md5(timestamp+ip+rand);
					break;
				case 1:
					session_id = sha1(timestamp+ip+rand);
					break;
				default:
					session_id = md5(timestamp+ip+rand);
			}
			//set session_id into cookie
			this.cookie(netConfig.sessionName, session_id);
		}else{
			//get session_id from cookie
			session_id = this.cookie(netConfig.sessionName);
		}

		if(netConfig.sessionSaveHandler == 'files'){
			var session_file = netConfig.sessionSavePath+'sess_'+session_id;
			if(!session_val && !session_name){
				return COOKIE;
			}else if(!session_val && session_name){
				// if(cookie_name instanceof Array){
				// 	var obj = {};
				// 	for(var item in cookie_name) {
				// 		if(!COOKIE[item]){
				// 			obj[item] = cookie_name[item];
				// 		}else{
				// 			COOKIE[item] = cookie_name[item];
				// 		}
				// 	}
				// 	COOKIE = Object.assign(COOKIE, obj);
				// }else{
				// 	return COOKIE[cookie_name] || '';
				// }
			}else{
				FS.access(netConfig.sessionSavePath, (err) => {
					//make directory if not exist
					if(err){
						FS.mkdirSync(netConfig.sessionSavePath);
					}
					var session_obj = {session_name:session_val};
					var session_str = JSON.stringify(session_obj);
					FS.stat(session_file, (err, stats) => {
						if(!err){
							var data1 = mdate(stats.ctime);
							var data2 = mdate();
							if((mdate(stats.ctime)-mdate())/1000 < 3){
								FS.readFile(session_file, (err, data) => {
									if (!err){
										var origin_session = JSON.parse(data);
										origin_session = Object.assign(origin_session, session_obj);
										session_str = JSON.stringify(origin_session);
										FS.writeFile(session_file, session_str, (err, written, string) => {
											return err ? false : true;
										});
									}else{
										var err = new Error('(T ^ T)~ SESSION FILE CAN NOT ACCESS');
										err.code = 'SESSION_ERR';
										throw err;
									}
								});
							}else{
								return false;
							}									
						}else{
							FS.writeFile(session_file, session_str, (err, written, string) => {
								return err ? false : true;
							});
						}
					})
				});
			}
		}
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

	/**
	 * Create a random number between min_num and max_num
	 * @param  {[Int]} min_num
	 * @param  {[Int]} max_num
	 * @return {[Int]}
	 */
	this.random = function(min_num,max_num){
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
	this.ldate = function(date_str, type){
		if(!type){
			return !date_str ? new Date().toLocaleString() : new Date(date_str).toLocaleString();
		}else{
			var cday = !date_str ? new Date().toLocaleString() : new Date(date_str).toLocaleString();
			var cday_obj = new Date(cday);
			switch (type)
			{
				case 1:
					cday = cday_obj.getFullYear()+'-'+cday_obj.getMonth()+'-'+cday_obj.getDate();
					break;
				case 2:
					cday = cday_obj.getHours()+':'+cday_obj.getMinutes()+':'+cday_obj.getSeconds();
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
	this.lmdate = function(date_str){
		return !date_str ? new Date(this.ldate()).getTime() : new Date(this.ldate(date_str)).getTime();
	}

	/**
	 * Return the timestamp(millisecond) by date_str.
	 * @param  {[String]} date_str [the string time]
	 * @return {[Int]}
	 */
	this.mdate = function(date_str){
		return !date_str ? new Date().getTime() : new Date(date_str).getTime();
	}

};
module.exports = new utility();