var web = function(req, resp) {
	this.COOKIE = {};
	this.SESSION = {};
	this.temp = temp;

	/**
	 * Set cookie
	 * eg. cookie(Array) //batch set cookie if cookie_name is Array
	 * eg. cookie(Array, Array) //batch set cookie if cookie_name is Array and set cookies' option with opt
	 * eg. cookie(String, String) //set cookie's value as cookie_val which cookie's name is cookie_name
	 * eg. cookie(String, String, Array) //set cookie's value as cookie_val and set cookie's option with opt which cookie's name is cookie_name
	 *
	 * @param  {String or Array} cookie_name [cookie_name is cookie's key when cookie_name is string; otherwise cookie_name is used to batch set cookie]
	 * @param  {String or Array or null} cookie_val  [cookie_val is cookie's value when cookie_name is array; otherwise cookie_val is used as opt]
	 * @param  {Array} opt  [the cookie ext options]
	 */
	this.setCookie = function(cookie_name, cookie_val, opt) {
		if (!cookie_val || isArray(cookie_val)) {
			if (isArray(cookie_name)) {
				var obj = {};
				for (var item in cookie_name) {
					req.headers.cookie[item] = cookie_name[item];
				}
			} else {
				var err = new Error('(T ^ T)~ COOKIE PARAM ERROR');
				err.code = 'COOKIE';
				throw err;
			}
		} else {
			req.headers.cookie[cookie_name] = cookie_val;
			var cookie_name_arr = [];
			cookie_name_arr[cookie_name] = cookie_val;
			cookie_name = cookie_name_arr;
		}
		if (isArray(cookie_val)) {
			opt = cookie_val;
		}
		this.serializeCookie(req.headers.cookie_set, cookie_name, opt);
	}

	/**
	 * Get cookie
	 * @param  {String or null} cookie_name [the name which cookie will be returned, if none return all cookies]
	 * @return {String or Array}
	 */
	this.getCookie = function(cookie_name) {
		if (!cookie_name) {
			//no param return all cookies
			if (Object.keys(req.headers.cookie).length <= 0) {
				return '';
			} else {
				return req.headers.cookie;
			}
		} else {
			return req.headers.cookie[cookie_name];
		}
	}

	/**
	 * Delete cookie
	 * delete cookie if the cookie_name is not null, otherwise delete all cookies.
	 * @param  {String} cookie_name [The name of cookie]
	 * @return {null}
	 */
	this.unsetCookie = function(cookie_name) {
		if (!cookie_name) {
			req.headers.cookie = [];
			req.headers.cookie_set = [];
		} else {
			delete req.headers.cookie[cookie_name];
			delete req.headers.cookie_set[cookie_name];
		}
	}

	/**
	 * Serialize the system's variable which named req.headers.cookie_set.
	 * @param  {Array} cookie_set [The old cookie array]
	 * @param  {Array} cookie_arr [The new cookie array]
	 * @param  {Array} opt [The cookie ext options]
	 */
	this.serializeCookie = function(cookie_set, cookie_arr, opt) {
		if (isArray(cookie_arr)) {
			for (cookie in cookie_arr) {
				var params = [];
				params.push(cookie + '=' + cookie_arr[cookie]);
				opt = opt || [];
				if (opt['maxAge']) {
					params.push('Max-Age=' + opt['maxAge']);
				}
				if (opt['domin']) {
					params.push('Domin=' + opt['domin']);
				}
				if (opt['path']) {
					params.push('Path=' + opt['path']);
				}
				if (opt['expires']) {
					params.push('Expires=' + opt['expires'].toUTCString());
				}
				if (opt['httpOnly']) {
					params.push('HttpOnly');
				}
				if (opt['secure']) {
					params.push('Secure');
				}
				cookie_set[cookie] = params.join(';');
			}
		} else {
			var err = new Error('(T ^ T)~ COOKIE SERIALIZE PARAM ERROR');
			err.code = 'COOKIE';
			throw err;
		}
	}

	this.createSessionId = function() {
		var session_id = '';
		var timestamp = Date.now();
		var ip = this.getClientIp();
		var rand = random(1000, 9999);

		switch (netConfig.sessionHashFunction) {
			case 0:
				session_id = md5(timestamp + ip + rand);
				break;
			case 1:
				session_id = sha1(timestamp + ip + rand);
				break;
			default:
				session_id = md5(timestamp + ip + rand);
		}
		//set session_id into cookie
		this.setCookie(netConfig.sessionName, session_id);
		return session_id;
	}

	/**
	 * Set session
	 * @param {String} session_name [The key which session will be setted]
	 * @param {String or Json} session_val [The session's value will be setted]
	 */
	this.setSession = function(session_name, session_val) {
		var session_id = '';
		if (!this.getCookie(netConfig.sessionName)) {
			session_id = this.createSessionId();
		} else {
			//get session_id from cookie
			session_id = this.getCookie(netConfig.sessionName);
		}

		if (netConfig.sessionSaveHandler == 'files') {
			FS.access(netConfig.sessionSavePath, (err) = > {
				//make directory if not exist
				if (err) {
					FS.mkdirSync(netConfig.sessionSavePath);
				}
			});
			var session_file = netConfig.sessionSavePath + 'sess_' + session_id;
			if (!session_val) {
				if (isArray(session_name)) {
					var session_obj = {};
					for (var item in session_name) {
						session_obj[item] = session_name[item];
					}

					var session_str = JSON.stringify(session_obj);
					try {
						var stats = FS.statSync(session_file);
						if (stats) {
							if ((mdate(stats.ctime) - mdate()) / 1000 < netConfig.sessionCacheExpire) {
								var data = FS.readFileSync(session_file);
								if (data) {
									var origin_session = JSON.parse(data);
									origin_session = Object.assign(origin_session, session_obj);
									session_str = JSON.stringify(origin_session);
								}
							} else {
								//recreate session id and delete the old one.
								FS.unlinkSync(session_file);
								session_id = this.createSessionId();
								session_file = netConfig.sessionSavePath + 'sess_' + session_id;
							}
						}
					} catch (err) {
						//recreate session id and delete the old one.
						session_id = this.createSessionId();
						session_file = netConfig.sessionSavePath + 'sess_' + session_id;
					}
					//modify the session file if existed or the file will be created.
					FS.writeFileSync(session_file, session_str);
					return session_id;
				} else {
					var err = new Error('(T ^ T)~ SESSION PARAM ERROR');
					err.code = 'SESSION';
					throw err;
				}
			} else {
				if (isString(session_name)) {
					var session_obj = {};
					var session_str = '';
					try {
						var stats = FS.statSync(session_file);
						if (stats) {
							if ((mdate(stats.ctime) - mdate()) / 1000 < netConfig.sessionCacheExpire) {
								var data = FS.readFileSync(session_file);
								if (data) {
									var origin_session = JSON.parse(data);
									origin_session[session_name] = session_val;
									session_str = JSON.stringify(origin_session);
								}
							} else {
								session_obj[session_name] = session_val;
								session_str = JSON.stringify(session_obj);
								FS.unlinkSync(session_file);
								session_id = this.createSessionId();
								session_file = netConfig.sessionSavePath + 'sess_' + session_id;
							}
						}
					} catch (err) {
						session_obj[session_name] = session_val;
						session_str = JSON.stringify(session_obj);
					}
					FS.writeFileSync(session_file, session_str);
					return session_id;
				} else {
					var err = new Error('(T ^ T)~ SESSION PARAM ERROR');
					err.code = 'SESSION';
					throw err;
				}
			}
		}
	}

	/**
	 * Get session
	 * @param  {String or null} session_name [The name which session will be returned]
	 * @return {String or Json}
	 */
	this.getSession = function(session_name) {
		var session_file = ''
		if (this.getCookie(netConfig.sessionName)) {
			var session_id = this.getCookie(netConfig.sessionName);
			session_file = netConfig.sessionSavePath + 'sess_' + session_id;
		} else {
			return false;
		}
		if (netConfig.sessionSaveHandler == 'files') {
			if (!session_name) {
				try {
					var stats = FS.statSync(session_file);
					if (stats) {
						if ((mdate(stats.ctime) - mdate()) / 1000 < netConfig.sessionCacheExpire) {
							var data = FS.readFileSync(session_file);
							if (data) {
								return JSON.parse(data);
							} else {
								return false;
							}
						} else {
							FS.unlinkSync(session_file);
							return false;
						}
					}
				} catch (err) {
					return false;
				}
			} else if (isString(session_name)) {
				try {
					var stats = FS.statSync(session_file);
					if (stats) {
						if ((mdate(stats.ctime) - mdate()) / 1000 < netConfig.sessionCacheExpire) {
							var data = FS.readFileSync(session_file);
							if (data) {
								var obj_data = JSON.parse(data);
								return obj_data[session_name];
							} else {
								return false;
							}
						} else {
							FS.unlinkSync(session_file);
							return false;
						}
					}
				} catch (err) {
					return false;
				}
			} else {
				var err = new Error('(T ^ T)~ SESSION PARAM ERROR');
				err.code = 'SESSION';
				throw err;
			}
		}
	}

	/**
	 * Delete session
	 * delete session if the session_name is not null, otherwise delete all sessions.
	 * @param  {String or null} session_name [The name of cookie]
	 * @return {Bull}
	 */
	this.unsetSession = function(session_name) {
		var session_file = ''
		if (this.getCookie(netConfig.sessionName)) {
			var session_id = this.getCookie(netConfig.sessionName);
			session_file = netConfig.sessionSavePath + 'sess_' + session_id;
		} else {
			return false;
		}
		if (netConfig.sessionSaveHandler == 'files') {
			var session_str = '';
			if (session_name) {
				if (isString(session_name)) {
					var session_obj = {};
					var session_str = '';
					try {
						var stats = FS.statSync(session_file);
						if (stats) {
							if ((mdate(stats.ctime) - mdate()) / 1000 < netConfig.sessionCacheExpire) {
								var data = FS.readFileSync(session_file);
								if (data) {
									var origin_session = JSON.parse(data);
									delete origin_session[session_name];
									session_str = JSON.stringify(origin_session);
									return true;
								}
							} else {
								FS.unlinkSync(session_file);
								return false;
							}
						}
					} catch (err) {
						return false;
					}
				} else {
					var err = new Error('(T ^ T)~ SESSION PARAM ERROR');
					err.code = 'SESSION';
					throw err;
				}
			}

			FS.writeFileSync(session_file, session_str);
			return true;
		}
	}

	/**
	 * Get remote client ip
	 * @return {String}
	 */
	this.getClientIp = function() {
		return req.headers['x-forwarded-for'] ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress;
	};
}

module.exports = web;