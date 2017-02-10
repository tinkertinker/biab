/**
 * External dependencies
 */

const debug = require( 'debug' )( 'biab:devices' );

/**
 * Internal dependencies
 */

const config = require( 'config' );

// Devices
const devices = {
	camera: require( 'devices/camera' ),
	sensehat: require( 'devices/sensehat' )
};
const DEVICE_CONFIG = 'devices';
const WP_CONFIG = 'wordpress';

function saveDevices( param ) {
	const parts = param.split( ' ' );

	if ( parts.length === 3 ) {
		config.set( DEVICE_CONFIG, parts[0].split( ',' ) );
		config.set( WP_CONFIG, {
			directory: parts[1],
			rest: parts[2],
		} );

		this.emit( 'result', 'ok' );
	} else {
		this.emit( 'error', 'Invalid device params' );
	}
}

const enableDevice = ( device, emitter ) => devices[device] ? devices[device]( emitter ) : false;

module.exports = function( emitter ) {
	const enabled = config.get( DEVICE_CONFIG, [] );

	debug( 'Enabled devices: ' + enabled.join( ', ' ) );

	// Enable devices
	enabled.map( device => enableDevice( device, emitter ) );

	// Listen for device config
	emitter.on( 'devices', saveDevices );
}
