var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)
var Gpio = require('pigpio').Gpio, //include pigpio to interact with the GPIO

 in1= new Gpio(23, {mode: Gpio.OUTPUT}), 
 in2 = new Gpio(24, {mode: Gpio.OUTPUT}),
 ena = new Gpio(18, 'out');
 in3= new Gpio(6, {mode: Gpio.OUTPUT}), 
 in4 = new Gpio(5, {mode: Gpio.OUTPUT}),
 enb = new Gpio(4, 'out');
 
 LED1 = new Gpio(26, {mode: Gpio.OUTPUT}),
 LED2 = new Gpio(19, {mode: Gpio.OUTPUT}),
 LED3 = new Gpio(13, {mode: Gpio.OUTPUT}),
 
 ena.pwmWrite(0);
 in1.digitalWrite(1);
 in2.digitalWrite(0);
 /*enb.pwmWrite(0);
 in3.digitalWrite(0);
 in4.digitalWrite(0);*/

 http.listen(8080); //listen to port 8080

function handler (req, res) { //create server
  fs.readFile(__dirname + '/public/index4.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
}
 
io.sockets.on('connection', function (socket) {// WebSocket Connection
  
  var controlvalue = 0; //static variable for current status

  socket.on('control', function(data) { //get light switch status from client
    controlvalue = data;
	if(controlvalue=='000'){//avanza lento
 ena.pwmWrite(70);
 in1.digitalWrite(1);
 in2.digitalWrite(0);
 enb.pwmWrite(70);
 in3.digitalWrite(1);
 in4.digitalWrite(0);

	
	  LED1.digitalWrite(1);
	  LED2.digitalWrite(1);
	  LED3.digitalWrite(1);
	  
				}
	
	else if(controlvalue=='001'){//alto
	ena.digitalWrite(0);
	enb.digitalWrite(0);
	in1.digitalWrite(0);
	in2.digitalWrite(0);
	in3.digitalWrite(0);
	in4.digitalWrite(0);
	  LED1.digitalWrite(0);
	  LED2.digitalWrite(0);
	  LED3.digitalWrite(1);  		    
				    }
	
	else if(controlvalue=='010'){//izquierda
 ena.pwmWrite(70);
 in1.digitalWrite(0);
 in2.digitalWrite(0);
 enb.pwmWrite(70);
 in3.digitalWrite(1);
 in4.digitalWrite(0);

	LED1.digitalWrite(0);
	  LED2.digitalWrite(1);
	  LED3.digitalWrite(0);
				    }
	
	else if(controlvalue=='011'){//derecha
	  
	ena.pwmWrite(50);
 in1.digitalWrite(1);
 in2.digitalWrite(0);
 enb.pwmWrite(50);
 in3.digitalWrite(0);
 in4.digitalWrite(0);


	  LED1.digitalWrite(0);
	  LED2.digitalWrite(1);
	  LED3.digitalWrite(1);  
				    }
	
	else if(controlvalue=='100'){//regreso lento
	ena.pwmWrite(50);
 in1.digitalWrite(0);
 in2.digitalWrite(1);
 enb.pwmWrite(50);
 in3.digitalWrite(0);
 in4.digitalWrite(1);

	  
	  LED1.digitalWrite(1);
	  LED2.digitalWrite(0);
	  LED3.digitalWrite(0); 
				    }

	else if(controlvalue=='101'){//avanza rapido
 ena.pwmWrite(120);
 in1.digitalWrite(1);
 in2.digitalWrite(0);
 enb.pwmWrite(120);
 in3.digitalWrite(1);
 in4.digitalWrite(0);

	
	  LED1.digitalWrite(0);
	  LED2.digitalWrite(0);
	  LED3.digitalWrite(1);
	  
				} 


	else if(controlvalue=='110'){//regreso rapido
	ena.pwmWrite(120);
 in1.digitalWrite(0);
 in2.digitalWrite(1);
 enb.pwmWrite(120);
 in3.digitalWrite(0);
 in4.digitalWrite(1);

	  
	  LED1.digitalWrite(0);
	  LED2.digitalWrite(0);
	  LED3.digitalWrite(1); 
				    }
				    
	    else {
	  ena.pwmWrite(0);
	  enb.pwmWrite(0);
	  in1.digitalWrite(0);
	  in2.digitalWrite(0);
	  in3.digitalWrite(0);
	  in4.digitalWrite(0);
	  
	  LED1.digitalWrite(0);
	  LED2.digitalWrite(0);
	  LED3.digitalWrite(0); 
				    }				    
				      

  });


});



process.on('SIGINT', function () { //on ctrl+c
	   ena.pwmWrite(0);
	  enb.pwmWrite(0);
	  in1.digitalWrite(0);
	  in2.digitalWrite(0);
	  in3.digitalWrite(0);
	  in4.digitalWrite(0);
	  
	  LED1.digitalWrite(0);
	  LED2.digitalWrite(0);
	  LED3.digitalWrite(0); 
	  
/*	  in1.unexport();
	  in2.unexport();
	  in3.unexport();
	  in4.unexport();
	  
	  LED1.unexport();
	  LED2.unexport();
	  LED3.unexport();
*/
  

  process.exit(); //exit completely
});
