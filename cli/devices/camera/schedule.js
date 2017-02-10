/**
 * External dependencies
 */

const path = require( 'path' );

/**
 * Internal dependencies
 */

const cron = require( 'cron' );

function setCameraCron( schedule ) {
	const cmd = path.resolve( path.join( __dirname, '..', 'biab' ) ) + ' camera-take-photo';
	const success = () => {
		this.emit( 'result', 'scheduled' );
	};
	const error = msg => {
		this.emit( 'error', msg );
	};

	cron( cmd, schedule, success, error );
}

module.exports = setCameraCron;
