/* requires section */
var PololuMaestro = require("./PololuMaestro/pololumaestro");

var MotorModule = function(){	
	
};

var maestro = null;
try
{
	console.log("initializing maestro");
	//create new instance, specifying control com port
	maestro = new PololuMaestro("/dev/ttyACM0", "/dev/ttyACM1");		
}
catch(err)
{
	console.log("could not connect to maestro" + err);
}

// initial starting position
// maestro range is 640 - 2304 micro seconds, can't exceed that range
var initPostion = 1465;// neutral should be 1500 - but the servos moved slightly with this value - came up with this value through trial and error on the maestro control panel
var rightWheelSpeed = initPostion;
var leftWheelSpeed = initPostion;
var currentSpeed = initPostion;
var SERVO_MAP = {"right":0, "left":1};// enum to the servo slots on the maestro

MotorModule.prototype.test = function(){
	 return 10;
 }

MotorModule.prototype.forwardBackward = function(speed){	
	if(maestro){		
		currentSpeed = speed;	
		this.setRightWheelSpeed(speed);			
		this.setLeftWheelSpeed(speed);
	}
}

MotorModule.prototype.setRightWheelSpeed = function(speed){
	if(maestro){
		rightWheelSpeed = speed;		
		console.log("setting right wheel: " + rightWheelSpeed);
		maestro.setTarget(SERVO_MAP.right, rightWheelSpeed);		
	}
}

MotorModule.prototype.setLeftWheelSpeed = function(speed){	
	if(maestro){
		// the left servo is physically reversed on the chassie, so need to reverse
		// the incomming speed value 
		var servoInverse = initPostion + (initPostion - speed);
		if(speed < initPostion){		
			servoInverse = initPostion - (speed - initPostion);
		}		
		leftWheelSpeed = servoInverse;
		console.log("setting left wheel: " + leftWheelSpeed);
		maestro.setTarget(SERVO_MAP.left, leftWheelSpeed);	
	}
}

MotorModule.prototype.getRightWheelSpeed = function(){
	return rightWheelSpeed;
}

MotorModule.prototype.getLeftWheelSpeed = function(){	
	return leftWheelSpeed;
}

MotorModule.prototype.getCurrentSpeed = function(){
	return currentSpeed;
}

MotorModule.prototype.stop = function(){	
	console.log("maestroWrapperStop");	
	this.setRightWheelSpeed(initPostion);	
	this.setLeftWheelSpeed(initPostion);
}

MotorModule.prototype.reset = function(){
	driver.reset();
}

function dumpObject(obj){	
	
	console.log("dump object called to debug");
	console.log(util.inspect(obj));
}

module.exports = MotorModule;
