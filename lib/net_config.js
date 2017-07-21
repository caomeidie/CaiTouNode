/**
 * @desc:net config file
 * @author:Henry Lee
 * @create date:2017/07/21
 *
 * */
require('./core');
var netConfig = {
	//session setting
	sessionSaveHandler = 'files';//Set the handler of session's save.
	sessionSavePath = "f:/wamp/tmp",//Set the path to save session if the handler of session's save is files.
	sessionIdMaxLength = 128,//Set the max length of session's id
	sessionUseCookies = 1,//If use cookies to translate the session id or not.Possible Values:0 no,1 yes.
	sessionName = 'NODESESSID',//Name of the session (used as cookie name).
	sessionCacheExpire = 180,//Document expires after n minutes.
	sessionHashFunction = 0//Select a hash function for use in generating session ids.Possible Values:0  (MD5 128 bits),1  (SHA-1 160 bits)
};
module.exports = config;