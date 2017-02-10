const exec = require( 'child_process' ).exec;
const debug = require( 'debug' )( 'biab:sensehat:data-to-wp' );

// TODO: convert this to use the wp REST API
function dataToWP( wp, commandData, json ) {
	const cmd = `/usr/bin/php ${ __dirname }/data-to-wp.php '${ JSON.stringify( json ) }'`;

	debug( 'Sending data to WordPress ' + cmd );

	exec( cmd, ( error, stdout, stderr ) => {
		if ( error ) {
			debug( 'Unable to send data to WordPress' );
			this.emit( 'error', 'Unable to send data to WordPress' );
		} else {
			this.emit( 'result', 'sent' );
		}
	} );
}

module.exports = dataToWP;
