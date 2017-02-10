/**
 * External dependencies
 */

const debug = require( 'debug' )( 'biab:sensehat:display' );
const spawn = require( 'child_process' ).spawn;

/**
 * Internal dependencies
 */
const config = require( 'config' );
const constants = require( './constants' );

const fahrenheit = celsius => ( celsius * ( 9 / 5 ) ) + 32;

function round( value, decimals ) {
	return Number( Math.round( value + 'e' + decimals ) + 'e-' + decimals );
}

function setDisplay( python, arg ) {
	debug( 'Sensehat display: ' + python + ( arg ? ' and ' + arg : '' ) );
	spawn( '/usr/bin/python', [ __dirname + '/display/' + python, arg ], { stdio: 'ignore', detached: true } );
}

function showReading( commandData ) {
	const settings = config.get( constants.settings, constants.defaults );
	const units = settings.units === 'celsius' ? 'C' : 'F';
	const temp = round( settings.units === 'celsius' ? commandData.temperature : fahrenheit( commandData.temperature ), 1 );

	setDisplay( 'show-message.py', temp + units );
}

function showCamera( commandData, json ) {
	setDisplay( 'show-image.py', __dirname + '/display/image/mean-face.png' );
}

function clearDisplay( commandData, json ) {
	setDisplay( 'clear.py' );
}

module.exports = {
	showReading,
	showCamera,
	clearDisplay,
};
