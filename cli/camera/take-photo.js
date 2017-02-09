const exec = require( 'child_process' ).exec;
const camera = require( './camera.json' );
const debug = require( 'debug' )( 'biab:camera:take-photo' );

function takePhoto( wp, commandData ) {
	const cmd = `/usr/bin/raspistill -n --timeout 500 ${ camera.args } -o -`;

	debug( 'Taking photo: ' + cmd );

	exec( cmd, { maxBuffer: 1024 * 10000, encoding: 'buffer' }, ( error, stdout, stderr ) => {
		if ( error ) {
			debug( 'Unable to open camera' );
			this.emit( 'error', 'Unable to open camera' );
		} else {
			debug( 'Photo taken - ' + stdout.length + ' bytes' );
			this.emit( 'phototowp', wp, commandData, stdout );
		}
	} );
}

module.exports = takePhoto;
