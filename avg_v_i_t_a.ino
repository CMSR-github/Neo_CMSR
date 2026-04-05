/**
THIS PRINTS READINGS IN THIS FORMAT:
{voltage}#{current}#{temperature}#{acceleration}\n
*/

#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BNO055.h>
#include <utility/imumaths.h>
int val11;
float val2;

/** current sensor constants*/
const int sensorPin = A0;

const float sensitivity = 0.020;
const float offsetVoltage = 0.0;

const float referenceVoltage = 5.0; // something about using analogReference(INTERNAL)?

const int numSamples = 10;
int sampleIndex = 0;

float V_readings[10] = {0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0};
float I_readings[10] = {0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0};
float temp_readings[10] = {0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0};
float a_readings[10] = {0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0};
  
Adafruit_BNO055 bno = Adafruit_BNO055(55);

void setup(void) 
{
  Serial.begin(9600);
  
  /* Initialise the sensor */
  if(!bno.begin())
  {
    /* There was a problem detecting the BNO055 ... check your connections */
    Serial.print("Ooops, no BNO055 detected ... Check your wiring or I2C ADDR!");
    while(1);
  }
  
  delay(200);
    
  bno.setExtCrystalUse(true);
}

void loop(void) 
{
  /* Voltage reader*/
  float v;
  val11=analogRead(1);
  v=val11/4.092;
  val2=(v/10);
  V_readings[sampleIndex] = val2;

  /* Get a new sensor event */ 
  sensors_event_t event; 
  bno.getEvent(&event);

  /* Update the current temperature */
  int8_t temp = bno.getTemp();
  temp_readings[sampleIndex] = temp;

  /* Update the acceleration */
  imu::Vector<3> accel = bno.getVector(Adafruit_BNO055::VECTOR_LINEARACCEL);
  a_readings[sampleIndex] = sqrt(accel.x()*accel.x()+accel.y()*accel.y()+accel.z()*accel.z());


  /** Get current*/

  long totalAnalogValue = 0;
  long a = analogRead(sensorPin);

  float voltage = (a / 1024.0) * referenceVoltage;
  float current = (voltage - offsetVoltage) / sensitivity;
 
  if (current < 0.0) {
    current = 0.0;
  }

  I_readings[sampleIndex] = current;

  /* CALCULATE AVERAGES*/
    // (if this is too slow, change to also keep track of sums and use subtraction)
  float v_avg = 0;
  float i_avg = 0;
  float temp_avg = 0;
  float a_avg = 0;
  for (int i = 0; i < numSamples; i++) {
    v_avg += V_readings[i];
  }
  for (int i = 0; i < numSamples; i++) {
    i_avg += I_readings[i];
  }
  for (int i = 0; i < numSamples; i++) {
    temp_avg += temp_readings[i];
  }
  for (int i = 0; i < numSamples; i++) {
    a_avg += a_readings[i];
  }
  v_avg = v_avg/(float)numSamples;
  i_avg = i_avg/(float)numSamples;
  temp_avg = temp_avg/(float)numSamples;
  a_avg = a_avg/(float)numSamples;


  sampleIndex++;
  if (sampleIndex >= numSamples) {
    /** DISPLAY ALL AVERAGES*/
    Serial.print(v_avg, 3);
    Serial.print("#");
    Serial.print(i_avg, 3);
    Serial.print("#");
    Serial.print(temp_avg, 1);
    Serial.print("#");
    Serial.print(a_avg, 3);
    Serial.println("");
    sampleIndex = 0;
  }

  delay(50);
}
