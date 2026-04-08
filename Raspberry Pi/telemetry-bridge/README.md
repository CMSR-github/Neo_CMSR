# 🌉 Telemetry Bridge (Serial-to-WebSocket)

## 📖 High-Level Overview

The **Telemetry Bridge** is a lightweight Node.js backend designed to connect the physical hardware (Arduino Uno) to the digital display (Next.js React app) for the solar boat's dashboard.

Web browsers cannot directly read physical USB ports for security reasons. This server acts as the middleman: it listens to the physical USB serial port, translates the raw string data from the sensors into structured JSON, and instantly broadcasts it to the local network using WebSockets.

---

## 🚀 Quick Start

1. **Install Dependencies:** Run `npm install` inside this directory.
2. **Find the Arduino Port:** Plug in the Arduino to the Raspberry Pi and run `ls /dev/tty*` in your terminal. Note the port (usually `/dev/ttyACM0` or `/dev/ttyUSB0`) and update line 12 in `server.js` if necessary.
3. **Run the Bridge:** Execute `node server.js`. You should see a listening confirmation message.

---

## ⚙️ System Requirements

* Node.js (v18+ recommended)
* Arduino connected via USB transmitting at `9600` baud.
* Next.js frontend running locally or on the same network.

---

## 🔬 Deep Implementation Details

This section covers the underlying architecture, data pipeline, and deployment strategy for maintaining high reliability during a race.

### 1. The Hardware Interface (`serialport`)
The bridge uses the `serialport` library to interface directly with the Raspberry Pi's Unix device files. The server is strictly configured to `9600` baud to match the Arduino's `Serial.begin(9600)`. If the Arduino's transmission speed is increased to minimize buffer blocking, this value must be updated symmetrically. Raw serial data arrives in fragmented byte chunks. To prevent processing partial data, the bridge pipes the raw stream through `@serialport/parser-readline`. This guarantees the `data` event only fires when a full packet terminates with a newline character.

### 2. The Data Pipeline & Protocol
The Arduino transmits a highly compressed string to save serial buffer space. The bridge is responsible for unpacking this string into a strongly-typed object for the frontend. The incoming raw format is `{voltage}#{current}#{temperature}#{acceleration}\n`. The bridge splits this string by the `#` delimiter and runs `parseFloat()` to convert the payload into floating-point numbers. The bridge then maps the array indices to their respective physical properties to match the frontend schema. Since velocity cannot be derived purely from instantaneous acceleration without severe integration drift, the `velocity` field is currently hardcoded to `0` until a dedicated pitot tube or GPS sensor is integrated.

### 3. The Network Interface (`socket.io`)
To achieve sub-second latency for the driver display, traditional HTTP polling is insufficient. The bridge spins up a Socket.io server on Port 3001. Cross-Origin Resource Sharing (CORS) is configured to allow the Next.js app to connect without browser security blocks. Every time a valid line is parsed from the serial port, the server fires an event, instantly pushing the new JSON payload to all connected frontend clients.

### 4. Fault Tolerance & Error Handling
On the water, physical connections can vibrate loose. The bridge includes basic event listeners for hardware errors. If the USB cord is yanked during operation, the Node process will throw an error and exit. It does not currently feature auto-reconnect logic for hardware disconnection.

### 5. Production Deployment (Race Day Configuration)
For actual operations, relying on an open terminal window is fragile. The Raspberry Pi should automatically start the telemetry bridge when it powers on. It is highly recommended to use PM2 (Process Manager 2) to daemonize the application. This ensures that if the server crashes due to a buffer overflow or power dip, PM2 will instantly restart the Node process without manual intervention.

To deploy with PM2:
1. Run `sudo npm install -g pm2`
2. Run `pm2 start server.js --name "telemetry-bridge"`
3. Run `pm2 startup`
4. Run `pm2 save`