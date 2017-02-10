/**
 * External dependencies
 */

const exec = require( 'child_process' ).exec;
const debug = require( 'debug' )( 'biab:camera:take-photo' );

/**
 * Internal dependencies
 */

const config = require( 'config' );
const constants = require( './constants' );

function takePhoto( wp, commandData ) {
	const camera = config.get( constants.setting, constants.defaults );
	const cmd = `/usr/bin/raspistill -n --timeout 500 ${ camera.args } -o -`;

	debug( 'Taking photo: ' + cmd );

	exec( cmd, { maxBuffer: 1024 * 10000, encoding: 'buffer' }, ( error, stdout, stderr ) => {
		if ( error ) {
			debug( 'Unable to open camera' );
			this.emit( 'error', 'Unable to open camera' );
		} else {
			debug( 'Photo taken - ' + stdout.length + ' bytes' );
			this.emit( 'photo-to-wp', wp, commandData, stdout );
		}
	} );
}

module.exports = takePhoto;
