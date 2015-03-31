var MaestroWrapper = require("./lib/MaestroWrapper/maestroWrapper");

var util = require('util');
var express= require("express"),
	app=express(),
	http=require("http"),
	server=http.createServer(app).listen(3000),
    io = require("socket.io").listen(server);

app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
	res.render('index.ejs');
});

var driver = new MaestroWrapper();
io.on("connection", function(socket){
	console.log("connection estasblished");
	
	socket.on("setRightWheel",function(data){
		driver.setRightWheelSpeed(data.speed);		
	});	
	
	socket.on("setLeftWheel",function(data){
		driver.setLeftWheelSpeed(data.speed);
	});	
});

/**
 * 
 */
function dumpObject(obj){	
	
	console.log("dump object called to debug");
	console.log(util.inspect(obj));
}
