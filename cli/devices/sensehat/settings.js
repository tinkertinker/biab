/**
 * External dependencies
 */

const debug = require( 'debug' )( 'biab:sensehat:settings' );
const fs = require( 'fs' );

/**
 * Internal dependencies
 */

const config = require( 'config' );
const constants = require( './constants' );

function saveSettings( settings ) {
	const parts = settings.split( ' ' );

	debug( 'Sensehat settings: ' + settings );

	if ( parts.length === 4 ) {
		const display = parts[2];
		const units = parts[3];

		config.set( constants.settings, { display: display === 'on' ? true : false, units: units } );
		this.emit( 'result', 'ok' );
	}
}

module.exports = saveSettings;
