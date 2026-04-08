This folder contains everything pertaining to the raspberry pi subteam working on the optimization and data collection team on Carnegie Mellon Solar Racing (CMSR) 

# 🚤 Solar Boat Telemetry System: Onboard Compute

## 📖 High-Level Overview

The `raspberry-pi` directory houses the complete onboard software stack for the driver's telemetry dashboard. It acts as the digital brain of the display system, bridging the gap between physical electrical sensors and a modern graphical interface. 

Because web browsers cannot directly communicate with physical USB ports for security reasons, this system is split into two distinct applications running simultaneously: a **backend bridge** that talks to the hardware, and a **frontend UI** that displays the data to the driver.

---

## 🏗️ System Architecture & Data Flow

The onboard compute system relies on a unidirectional data pipeline to ensure low-latency updates for the driver:

`[Physical Sensors] ➡️ [Arduino Uno] ➡️ (USB Serial) ➡️ [Telemetry Bridge] ➡️ (WebSockets) ➡️ [Display UI]`

1. **The Hardware:** The Arduino continuously reads the BNO055 IMU, the Matek Current Sensor, and the voltage divider, transmitting a compressed string over USB.
2. **The Backend (`telemetry-bridge`):** Reads the raw USB data, formats it, and hosts a local broadcast server.
3. **The Frontend (`displayui`):** Listens to the broadcast and updates the screen at 60fps.

---

## 📂 Directory Structure & Subsystems

### 1. `telemetry-bridge/` (The Hardware Interface)
**Purpose:** This is a lightweight Node.js backend server. Its sole responsibility is to translate raw hardware signals into web-friendly data. 

**How it fits in:** Web security protocols prevent a React application from reading a Raspberry Pi's `/dev/tty` USB ports. The bridge solves this by running at the operating-system level. It uses the `serialport` library to listen to the Arduino at `9600` baud, parses the incoming text (`voltage#current#temperature#acceleration`), packages it into a clean JSON object, and instantly broadcasts it to the local network via WebSockets (Socket.io) on **Port 3001**.

### 2. `displayui/` (The Driver Dashboard)
**Purpose:** This is the frontend Next.js (React) application that renders the telemetry dashboard for the driver.

**How it fits in:** This folder contains the styling (Tailwind CSS), layout, and logic for the screen the driver actually sees. When the application loads in the Pi's browser on **Port 3000**, it immediately opens a WebSocket connection to the `telemetry-bridge`. Every time a new JSON payload is received from the bridge, React automatically triggers a re-render, updating the on-screen velocity, acceleration, temperature, current, and voltage metrics with zero perceived latency.

---

## 🚀 Running the Full System Locally

To spin up the dashboard on a desk or during testing, you must start both subsystems in separate terminal windows.

**Terminal 1: Start the Bridge**

    cd telemetry-bridge
    npm install
    node server.js

*(Wait for the "Listening for Arduino..." confirmation message)*

**Terminal 2: Start the UI**

    cd displayui
    npm install
    npm run dev

*(Open a browser and navigate to `http://localhost:3000`)*

---

## 🏁 Production Deployment (Race Day)

Relying on open terminal windows on the water is dangerous. If the Pi reboots, or if a buffer overflows and crashes a server, the driver loses their screen. 

For the actual race, the system should be daemonized using **PM2** so that both the backend and frontend launch automatically when the Raspberry Pi receives power, and auto-restart if they crash.

    # Install PM2 globally
    sudo npm install -g pm2

    # Start the Telemetry Bridge
    cd telemetry-bridge
    pm2 start server.js --name "telemetry-bridge"

    # Start the Display UI (Production Build)
    cd ../displayui
    npm run build
    pm2 start npm --name "display-ui" -- start

    # Save the configuration to survive reboots
    pm2 startup
    pm2 save