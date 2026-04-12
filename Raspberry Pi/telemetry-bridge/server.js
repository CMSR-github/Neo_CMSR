// server.js
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const { Server } = require('socket.io');

// NOTE: Change '/dev/ttyACM0' to your actual Pi USB port (could be '/dev/ttyUSB0')
// Run `ls /dev/tty*` in your terminal to find the correct port if needed.
const ARDUINO_PORT = "/dev/tty.usbmodem2101"

// 1. Setup WebSocket Server on port 3001
const io = new Server(3001, {
  cors: { origin: '*' } // Allow your Next.js app to connect
});

// 2. Connect to the Arduino
const port = new SerialPort({ path: ARDUINO_PORT, baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

console.log("Listening for Arduino on " + ARDUINO_PORT + " ...");

// 3. Read data and broadcast it to React
parser.on('data', (line) => {
  // Line format from Arduino: "v_avg#i_avg#temp_avg#a_avg"
  const parts = line.trim().split('#');
  
  if (parts.length === 4) {
    const telemetryData = {
      voltage: parseFloat(parts[0]),
      current: parseFloat(parts[1]),
      temperature: parseFloat(parts[2]),
      acceleration: parseFloat(parts[3]),
      // Note: Velocity requires integration over time or a GPS module.
      // We will leave it at 0 for now until you add a speed sensor.
      velocity: 0 
    };

    // Broadcast to the React app
    io.emit('telemetry', telemetryData);
  }
});

port.on('error', (err) => {
  console.error('Serial Port Error: ', err.message);
});