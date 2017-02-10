/**
 * External dependencies
 */

const debug = require( 'debug' )( 'biab:sensehat:display' );
const spawn = require( 'child_process' ).spawn;

function round( value, decimals ) {
	return Number( Math.round( value + 'e' + decimals ) + 'e-' + decimals );
}

function setDisplay( python, arg ) {
	debug( 'Sensehat display: ' + python + ( arg ? ' and ' + arg : '' ) );
	spawn( '/usr/bin/python', [ __dirname + '/display/' + python, arg ], { stdio: 'ignore', detached: true } );
}

function showReading( commandData, json ) {
	setDisplay( 'show-message.py', round( json.temperature, 1 ) + 'C' );
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
