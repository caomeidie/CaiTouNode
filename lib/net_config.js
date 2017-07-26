/**
 * @desc:net config file
 * @author:Henry Lee
 * @create date:2017/07/21
 *
 * */
 var netConfig = {
	/*****[SESSION SETTING START]*****/
	/**
	 * Set the handler of session's save.
	 * Possible Values:files, memcached, redis, mysql.
	 */
	sessionSaveHandler : 'files',
	/**
	 * Set the path to save session if the handler of session's save is files.
	 */
	sessionSavePath : "./tmp/",
	/**
	 * If use cookies to translate the session id or not.Possible Values:0 no,1 yes.
	 */
	sessionUseCookies : 1,
	/**
	 * Name of the session (used as cookie name).
	 */
	sessionName : 'NODESESS',
	/**
	 * Document expires after n minutes.
	 */
	sessionCacheExpire : 180,
	/**
	 * Select a hash function for use in generating session ids.
	 * Possible Values:0  (MD5 128 bits),1  (SHA-1 160 bits).
	 */
	sessionHashFunction : 0,
	/**
	 *	Defines the probability that the 'garbage collection' process is started
	 *	on every session initialization. The probability is calculated by using
	 *	gc_probability/gc_divisor. Where session.gc_probability is the numerator
	 *	and gc_divisor is the denominator in the equation. Setting this value to 1
	 *	when the session.gc_divisor value is 100 will give you approximately a 1% chance
	 *	the gc will run on any give request.
	 *	Default Value: 1
	 *	Development Value: 1
	 *	Production Value: 1
	 */
	sessionGcProbability : 1,
	/**
	 *  Defines the probability that the 'garbage collection' process is started on every
	 *	session initialization. The probability is calculated by using the following equation:
	 *  gc_probability/gc_divisor. Where session.gc_probability is the numerator and
	 *	session.gc_divisor is the denominator in the equation. Setting this value to 1
	 *	when the session.gc_divisor value is 100 will give you approximately a 1% chance
	 *	the gc will run on any give request. Increasing this value to 1000 will give you
	 *	a 0.1% chance the gc will run on any give request. For high volume production servers,
	 *	this is a more efficient approach.
	 *	Default Value: 100
	 *	Development Value: 1000
	 *	Production Value: 1000
	 *	http://php.net/session.gc-divisor
	 */
	sessionGcDivisor : 1000
	/*****[SESSION SETTING END]*****/

	/*****[SESSION SETTING END]*****/
};
module.exports = netConfig;