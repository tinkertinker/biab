import sys
import random
from PIL import Image
from sense_hat import SenseHat

size = 8, 8

if len(sys.argv) > 1:
	sense = SenseHat()
	img = sys.argv[1]

	im = Image.open( img )
	im.load();
	im2 = im.quantize(32)

	im2 = im2.resize(size, 0)
	im2 = im2.convert( 'RGB' )

	px = im2.load()
	print im2.size
	for x in range(0,8):
		for y in range(0,8):
			sense.set_pixel( x, y, px[x,y] )
