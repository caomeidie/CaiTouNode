var upload = require(config.libPath + 'upload');
var common = require('./common');
var indexController = function(web, temp) {
	common.indexAction();
	this.indexAction = function() {
		// var connection = mysql.createConnection({
		//     host: 'localhost',
		//     user: 'root',
		//     password: '123456',
		//     database:'test_data'
		// });

		// connection.connect();
		// //查询
		// connection.query('SELECT * from tree', function(err, rows, fields) {
		//     if (err) throw err;
		//     console.log(rows[0]['id']);
		// });
		
		// //关闭连接
		// connection.end();
		//return false;
		var sys_name = '小馒头管理系统';
		var opt = new Array();
		opt['httpOnly'] = true;
		// web.setCookie('name','xiaomimi',opt);
		// web.setCookie('name2','xiaomimi2',opt);
		web.setSession('name2','xiaomimi2',opt);
		// var arr = new Array();
		// arr['name4'] = 'xiaomimi4';
		// arr['name5'] = 'xiaomimi5';
		// arr['name6'] = 'xiaomimi6';
		//web.setCookie(arr);
		//web.unsetCookie();
		//console.log(web.getCookie());
		//
		//console.log(web.getCookie('name4'));
		web.setSession('name', 'xiaomi')
		//web.setSession(arr);
		web.setSession('name', {sys_name:sys_name});
		// web.setSession('name', 'xiaomi');
		//web.unsetSession('name5');
		//console.log(web.getSession());
		//web.unsetSession();
		console.log(web.getSession());
		temp.assign({
			sys_name: sys_name
		});
		temp.display();
	};

	this.testAction = function() {
		DB.select("select * from tll_user", function(err,results,fields){
			//console.log(results);
			temp.display();
		});
	};

	this.postloginAction = function() {
		console.log(web.isGet);
		console.log(web.isPost);
		console.log(web.post);
		var file_path = './ccc.jpg';
		upload.set_size(500);
		upload.upload(web.post.bbb, file_path, (err) => {
			if (!err) {
				console.log('success');
			} else {
				console.log('faild');
			}
		});
		temp.display();
	}
}

module.exports = indexController;