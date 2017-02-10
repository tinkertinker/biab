/**
 * External dependencies
 */

const exec = require( 'child_process' ).exec;
const debug = require( 'debug' )( 'biab:camera:take-snapshot' );

/**
 * External dependencies
 */

const config = require( 'config' );
const constants = require( './constants' );

function takePhoto( commandData ) {
	const camera = config.get( constants.setting, constants.defaults );
	const wp = config.get( 'wordpress', { directory: '/opt/wp' } );
	const target = wp.directory + 'wp-content/uploads/snapshot.jpg';
	const cmd = `/usr/bin/raspistill -w 640 -h 480 -n --timeout 500 ${ camera.args } -o ${ target }`;

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
