import sys
from sense_hat import SenseHat
sense = SenseHat()

# colors
fg = (255, 0, 0)
bg = (0, 0, 0)

if len(sys.argv) > 1:
	msg = sys.argv[1]
	sense.show_message(msg, text_colour=fg, back_colour=bg)
