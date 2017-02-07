#!/bin/sh
WP_CLI_PACKAGES_DIR=/home/pi/.wp-cli
REQ=/home/pi/.wp-cli/packages/vendor/wp-cli/restful/wp-rest-cli.php
TAKEPHOTO=/usr/bin/raspistill

# Config stuffs
WP=/usr/local/bin/wp
FILE=/tmp/photo-$$.jpg
TITLE=`/usr/games/fortune | head -1`

# Load config from WP
. /opt/wp/photo.config

# Take a picture
$TAKEPHOTO $FLIP -n -q $QUALITY $OTHER --timeout 500 -o $FILE

if [ $? -eq 0 ]; then
	# Create a blank post
	POST_ID=`$WP --path=/opt/wp post create --post_type=post --post_title="$TITLE" --porcelain --post_status=publish`

	# Upload photo and attach to post as featured image
	PHOTO_ID=`$WP --path=/opt/wp media import $FILE --porcelain --post_id=$POST_ID --featured_image`

	echo '{"id":'$POST_ID'}'

	# Remove the temporary camera file
	rm $FILE
else
	echo '{"error":"Camera in use"}'
fi


