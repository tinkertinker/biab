const debug = require( 'debug' )( 'biab:camera:settings' );
const fs = require( 'fs' );

function saveSettings( wp, settings ) {
	const args = { args: settings };

	debug( 'Saving settings: ' + settings );
	fs.writeFileSync( __dirname + '/camera.json', JSON.stringify( args ) );
}

module.exports = saveSettings;
