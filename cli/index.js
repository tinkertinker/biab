const EventEmitter = require( 'events' ).EventEmitter;
const deviceEmitter = new EventEmitter();
const process = require( 'process' );

const debug = require( 'debug' )( 'biab:main' );

const WPAPI = require( 'wpapi' );
const auth = require( './auth.json' );
const wp = new WPAPI( auth );

// Devices
const camera = require( './camera' )( deviceEmitter );
const sensehat = require( './sensehat' )( deviceEmitter );

if ( process.argv.length < 3 ) {
	console.log( process.argv[1] + ': <command> [data]' );
	process.exit( 1 );
}

function runCommand( emitter, command, commandData ) {
	debug( 'Command: "' + command + '" with data "' + commandData + '"' );

	emitter.on( 'error', message => {
		console.log( JSON.stringify( { error: message } ) );
		process.exit( 1 );
	} );

	emitter.on( 'result', json => {
		console.log( json );
		process.exit( 0 );
	} );

	emitter.emit( command, wp, commandData );

	if ( emitter.listenerCount( command ) === 0 ) {
		debug( 'No handler for command ' + command );
		emitter.emit( 'error', 'No handler' );
	}
}

runCommand( deviceEmitter, process.argv[2], process.argv.length > 3 ? process.argv.slice( 3 ).join( ' ' ) : false );
