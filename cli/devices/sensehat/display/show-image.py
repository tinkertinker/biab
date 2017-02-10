import sys
import random
from sense_hat import SenseHat

if len(sys.argv) > 1:
	img = sys.argv[1]
	sense = SenseHat()
	sense.load_image( img, redraw=True )
