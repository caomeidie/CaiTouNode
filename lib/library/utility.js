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
};
module.exports = new utility();