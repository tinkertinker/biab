const debug = require( 'debug' )( 'biab:camera:settings' );
const fs = require( 'fs' );
const config = require( '../config' );

function saveSettings( wp, settings ) {
	debug( 'Camera settings: ' + settings );

	config.set( 'camera_settings', { args: settings } );
}

module.exports = saveSettings;
