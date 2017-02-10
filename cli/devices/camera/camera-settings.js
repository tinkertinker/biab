/**
 * External dependencies
 */

const debug = require( 'debug' )( 'biab:camera:settings' );
const fs = require( 'fs' );

/**
 * Internal dependencies
 */

const config = require( 'config' );

function saveSettings( settings ) {
	debug( 'Camera settings: ' + settings );

	config.set( 'camera_settings', { args: settings } );
	this.emit( 'result', 'ok' );
}

module.exports = saveSettings;
