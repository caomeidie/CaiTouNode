var temp = require('./template');
var Controller = function(req, resp){
	this.COOKIE = {};
	this.SESSION = {};
	this.temp = temp;

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
		var cookies = req.headers.cookie;
		console.log(cookies);
		var cookie_arr = new Array();
		if(cookies){
			var item_arr = cookies.split(';');
			for(var num in item_arr){
				var item = item_arr[num].split('=');
				cookie_arr[item[0]] = item[1];
			}
		}
		if(!cookie_val && !cookie_name){
			if(!cookies){
				return '';
			}else{
				return cookie_arr;
			}
		}else if(!cookie_val && cookie_name){
			if(cookie_name instanceof Array){
				var obj = {};
				for(var item in cookie_name) {
					if(!cookie_arr[item]){
						obj[item] = cookie_name[item];
					}else{
						cookie_arr[item] = cookie_name[item];
					}
				}
				cookie_arr = Object.assign(cookie_arr, obj);
			}else{
				return cookie_arr[cookie_name] || '';
			}
		}else{
			cookie_arr[cookie_name] = cookie_val;
			req.headers.cookie = serializeCookie(cookie_arr);
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
				FS.stat(session_file, (err, stats) => {
					if(!err){
						if((mdate(stats.ctime)-mdate())/1000 < 3){
							FS.readFile(session_file, (err, data) => {
								if (!err){
									return JSON.parse(data);
								}else{
									return false;
								}
							});
						}else{
							return false;
						}									
					}else{
						return false;
					}
				})
			}else if(!session_val && session_name){
				if(session_name instanceof Array){
					var session_obj = {};	
					for(var item in session_name) {
						session_obj[item] = session_name[item];
					}
					
					var session_str = JSON.stringify(session_obj);
					FS.stat(session_file, (err, stats) => {
						if(!err){
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
				}else{
					FS.stat(session_file, (err, stats) => {
						if(!err){
							if((mdate(stats.ctime)-mdate())/1000 < 3){
								FS.readFile(session_file, (err, data) => {
									if (!err){
										var session_obj = JSON.parse(data);
										return !session_obj[cookie_name] ? false : session_obj[cookie_name];
									}else{
										return false;
									}
								});
							}else{
								return false;
							}									
						}else{
							return false;
						}
					})
				}
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
	 * Make serialized cookie string
	 * @param  {[Object]} obj [The cookie object which build like key-value]
	 * @param  {[Object]} opt [the cookie ext options]
	 * @return {[String]}
	 */
	function serializeCookie(obj,opt){
		var params = [];
		for(var cookie in obj){
			params.push(cookie + '=' + obj[cookie]);
		}
		
		opt = opt || {};
		if(opt.maxAge){
			params.push('Max-Age=' + opt.maxAge);
		}
		if(opt.domin){
			params.push('Domin=' + opt.domin);
		}
		if(opt.path){
			params.push('Path=' + opt.path);
		}
		if(opt.expires){
			params.push('Expires=' + opt.expires.toUTCString());
		}
		if(opt.httpOnly){
			params.push('HttpOnly');
		}
		if(opt.secure){
			params.push('Secure');
		}
		return params.join(';');
	}
}

module.exports = new Controller();