const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type':'text/html'});
	res.write('<style>.fru{width:50px;height:50px;margin-bottom: 25px;border-radius:50%;}</style>');
	MongoClient.connect(url, function(err, db){
		if(err) throw err;
		let dbo = db.db('shop');
		dbo.collection('fruits').find({}).toArray(function(err, result){
			if(err) throw err;

			for(let i = 0; i < result.length; i++){
				let fruit = result[i];
				res.write(`<div class="fru" style="background: ${fruit['color']}">${fruit['name']}</div>`);
				console.log(fruit['name'] + '\n');

			}
			res.end();

		})
		db.close();
	});
	res.write('<h1>Hello to Node server!</h1>');
}).listen(3000, 'localhost');

console.log('server is running on 3000 at localhost');
