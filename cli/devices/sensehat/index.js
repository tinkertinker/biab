/**
 * External dependencies
 */

const debug = require( 'debug' )( 'biab:sensehat' );

/**
 * Internal dependencies
 */

const config = require( 'config' );
const constants = require( './constants' );
const schedule = require( './schedule' );
const settings = require( './settings' );
const dataToWP = require( './data-to-wp' );
const capture = require( './capture' );
const display = require( './display' );

module.exports = function( emitter ) {
	debug( 'Enabling Sensehat' );

	emitter.on( 'sensehat-capture', capture );
	emitter.on( 'sensehat-reading', dataToWP );
	emitter.on( 'sensehat-settings', schedule );
	emitter.on( 'sensehat-settings', settings );

	// Display output
	emitter.on( 'sensehat-reading', display.showReading );
	emitter.on( 'camera-take-photo', display.showCamera );
	emitter.on( 'photo-published', display.clearDisplay );
	emitter.on( 'error', display.clearDisplay );
};
