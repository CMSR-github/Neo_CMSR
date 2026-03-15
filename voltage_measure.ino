// Define the analog pin connected to the "Curr" pad on the sensor
const int sensorPin = A0;

// MATEKSYS HCS-150A Specifications
const float sensitivity = 0.020; // 20mV per Amp = 0.020 V/A
const float offsetVoltage = 0.0; // Assuming 0V at 0 Amps

// Your microcontroller's logic voltage.
// Standard Arduinos (Uno, Nano, Mega) use 5.0V.
// If using an ESP32, Teensy, or 3.3V Arduino, change this to 3.3.
const float referenceVoltage = 5.0;

// Number of samples for smoothing
const int numSamples = 50;

void setup() {
  Serial.begin(9600);
  Serial.println("MATEKSYS 150A Current Sensor Initialized...");
}

void loop() {
  long totalAnalogValue = 0; // Use 'long' to prevent overflow when adding up many samples
 
  // 1. Take a batch of readings to average out electrical noise
  for (int i = 0; i < numSamples; i++) {
    totalAnalogValue += analogRead(sensorPin);
    delay(2); // Short delay to let the ADC stabilize
  }
 
  float averageAnalogValue = (float)totalAnalogValue / numSamples;
 
  // 2. Convert the raw analog value to voltage
  // NOTE: Standard Arduinos have a 10-bit ADC (1024 resolution).
  // If you are using a board with a 12-bit ADC (like an ESP32), change 1024.0 to 4096.0
  float voltage = (averageAnalogValue / 1024.0) * referenceVoltage;
 
  // 3. Convert the voltage to current (Amps)
  // Formula: Current = (Measured Voltage - Offset Voltage) / Sensitivity
  float current = (voltage - offsetVoltage) / sensitivity;
 
  // Optional: Since this is a unidirectional sensor,
  // lock the lowest value to 0.00A to prevent tiny negative numbers from noise.
  if (current < 0.0) {
    current = 0.0;
  }
 
  // 4. Print the results to the Serial Monitor
  Serial.print("Voltage: ");
  Serial.print(voltage, 3);
  Serial.print(" V  |  Current: ");
  Serial.print(current, 2);
  Serial.println(" A");
 
  // Wait half a second before taking the next reading
  delay(500);
}