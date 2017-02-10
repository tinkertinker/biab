/**
 * External dependencies
 */

const debug = require( 'debug' )( 'biab:sensehat:data-to-wp' );

function dataToWP( wp, commandData, json ) {
	debug( 'Sending data to WordPress ' );
	const emitter = this;
	wp.sensehat().create( json ).then( function( data ) {
		emitter.emit( 'result', data );
	}).catch( function( err ) {
		emitter.emit( 'error', 'Unable to send data to WordPress - ' + err.message );
	});
}

module.exports = dataToWP;
