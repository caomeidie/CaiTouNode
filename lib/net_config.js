/**
 * @desc:net config file
 * @author:Henry Lee
 * @create date:2017/07/21
 *
 * */
 var netConfig = {
	//session setting
	sessionSaveHandler : 'files',//Set the handler of session's save.
	sessionSavePath : "F:/nodejs/tmp/",//Set the path to save session if the handler of session's save is files.
	sessionUseCookies : 1,//If use cookies to translate the session id or not.Possible Values:0 no,1 yes.
	sessionName : 'NODESESS',//Name of the session (used as cookie name).
	sessionCacheExpire : 180,//Document expires after n minutes.
	sessionHashFunction : 0//Select a hash function for use in generating session ids.Possible Values:0  (MD5 128 bits),1  (SHA-1 160 bits)
};
module.exports = netConfig;