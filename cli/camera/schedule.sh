#!/bin/sh
INTERVAL=$1
DIR=$(dirname "$(readlink -f "$0")")
CRONCMD="$DIR/take-photo.sh"
CRONJOB=`printf '%d * * * * %s' $INTERVAL $CRONCMD`

if [ "$INTERVAL" = "0" ]; then
	( crontab -l | grep -v -F "$CRONCMD" ) | crontab -
else
	( crontab -l | grep -v -F "$CRONCMD" ; echo "$CRONJOB" ) | crontab -
fi
