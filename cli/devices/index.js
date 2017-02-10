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

function saveDevices( wp, devices ) {
	config.set( DEVICE_CONFIG, devices.split( ',' ) );
	this.emit( 'result', 'ok' );
}

const enableDevice = ( device, emitter ) => devices[device] ? devices[device]( emitter ) : false;

module.exports = function( emitter ) {
	const enabled = config.get( DEVICE_CONFIG );

	debug( 'Enabled devices: ' + enabled.join( ', ' ) );

	// Enable devices
	enabled.map( device => enableDevice( device, emitter ) );

	// Listen for device config
	emitter.on( 'devices', saveDevices );
}
