import json
from sense_hat import SenseHat

def main():
	sense = SenseHat()
	tem_pressure = sense.get_temperature_from_pressure()
	tem_humidity = sense.get_temperature_from_humidity()
	tem = (tem_humidity + tem_pressure) / 2
	hum = sense.get_humidity()
	air = sense.get_pressure()
	print json.dumps( { 'temperature': tem, 'humidity': hum, 'air_pressure': air } )

if __name__ == "__main__":
	main()
