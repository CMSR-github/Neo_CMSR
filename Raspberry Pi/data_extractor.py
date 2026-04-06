import serial

def extract(s):
  result = ""
  index = 0
  while True:
    if index < len(s) and s[index] != '#':
      result += s[index]
    else:
      index += 1
      break
    index += 1
    return int(result), s[index:]

def assignVars(x):
  temperature, rest = extract(x)
  voltage, rest = extract(rest)
  current, rest = extract(rest)
  velocity, rest = extract(rest)

  return temperature, voltage, current, velocity

if name == '__main__':
  ser = serial.Serial('dev/ttyACM0', 115200, timeout=1)
  ser.reset_input_buffer()

  while True:
    if ser.in_waiting > 0:
      line = ser.readline().decode('utf-8').rstrip()
      print(line)
