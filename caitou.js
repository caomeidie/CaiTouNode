var http = require('http');
var url = require('url');
var fs = require('fs');
var img_arr = new Array("jpg","bmp","gif","ico","png");
var postHTML = 
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<h2>你好啊</h2>' +
  '<img src="./bg.jpg" />' +
  '</body></html>';

http.createServer(function(req, resp){
	var pathname = url.parse(req.url).pathname;	
	var filename = pathname.substr(1);
	if(filename != ""){
		var ext_arr = filename.split(".");
		var ext = ext_arr.pop();
		if(img_arr.indexOf(ext) != -1){
			fs.readFile(filename, 'binary', function (err, data) {
				if (err) {
					console.log(err);
					resp.writeHead(404, {'Content-Type': 'text/html'});
				}else{	         
					resp.writeHead(200, {'Content-Type': 'image/'+ext});	
					resp.write(data, 'binary');		
				}
				resp.end();
			});	
		}else{
			fs.readFile(filename, function (err, data) {
				if (err) {
					console.log(err);
					resp.writeHead(404, {'Content-Type': 'text/html'});
				}else{	         
					resp.writeHead(200, {'Content-Type': 'text/html'});	
					resp.write(data.toString());		
				}
				resp.end();
			});
		}
	}else{
		resp.writeHead(200,{'Content-Type':'text/html'});
		resp.write(postHTML);
		resp.end();
	}
}).listen(8888);
