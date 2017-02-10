const exec = require( 'child_process' ).exec;
const config = require( '../config' );
const debug = require( 'debug' )( 'biab:camera:take-snapshot' );
const constants = require( './constants' );

function takePhoto( wp, commandData ) {
	const camera = config.get( constants.setting, constants.defaults );
	const cmd = `/usr/bin/raspistill -w 640 -h 480 -n --timeout 500 ${ camera.args } -o /opt/wp/wp-content/uploads/snapshot.jpg`;

	debug( 'Taking photo: ' + cmd );

	exec( cmd, ( error, stdout, stderr ) => {
		if ( error ) {
			debug( 'Unable to open camera' );
			this.emit( 'error', 'Unable to open camera' );
		} else {
			debug( 'Photo taken - ' + stdout.length + ' bytes' );
			this.emit( 'result', 'ok' );
		}
	} );
}

module.exports = takePhoto;
