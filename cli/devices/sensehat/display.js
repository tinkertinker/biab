/**
 * External dependencies
 */

const debug = require( 'debug' )( 'biab:sensehat:display' );
const spawn = require( 'child_process' ).spawn;
const url = require( 'url' );
const path = require( 'path' );

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

function showCamera( commandData ) {
	setDisplay( 'show-image.py', __dirname + '/display/image/mean-face.png' );
}

function clearDisplay( commandData ) {
	setDisplay( 'clear.py' );
}

function showPhoto( commandData ) {
	const wp = config.get( 'wordpress', { directory: '/opt/wp' } );
	const wpUrl = url.parse( commandData.thumbnail.source_url );
	const imagename = path.join( wp.directory, wpUrl.pathname );

	setDisplay( 'show-resized-image.py', imagename );
}

module.exports = {
	showReading,
	showCamera,
	clearDisplay,
	showPhoto,
};
