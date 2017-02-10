/**
 * External dependencies
 */

const EventEmitter = require( 'events' ).EventEmitter;
const process = require( 'process' );

const debug = require( 'debug' )( 'biab:main' );

/**
 * External dependencies
 */

const deviceEmitter = new EventEmitter();
const devices = require( 'devices' )( deviceEmitter );

if ( process.argv.length < 3 ) {
	console.log( process.argv[1] + ': <command> [data]' );
	process.exit( 1 );
}

function runCommand( emitter, command, commandData ) {
	debug( 'Command: "' + command + '" with data "' + ( commandData ? commandData : '' ) + '"' );

	emitter.on( 'error', message => {
		console.log( JSON.stringify( { error: message } ) );
		process.exit( 1 );
	} );

	emitter.on( 'result', json => {
		console.log( json );
	} );

	emitter.emit( command, commandData );

	if ( emitter.listenerCount( command ) === 0 ) {
		debug( 'No handler for command ' + command );
		emitter.emit( 'error', 'No handler' );
	}
}

runCommand( deviceEmitter, process.argv[2], process.argv.length > 3 ? process.argv.slice( 3 ).join( ' ' ) : false );
