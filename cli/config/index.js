const debug = require( 'debug' )( 'biab:config' );
const fs = require( 'fs' );
const path = require( 'path' );

const filename = () => path.resolve( path.join( __dirname, 'config.json' ) );

function setConfig( section, value ) {
	const config = getConfig();

	debug( 'Writing to config: ' + section, value );
	config[section] = value;

	fs.writeFileSync( filename(), JSON.stringify( config, null, '\t' ) );
}

function getConfig( section, defaults ) {
	let config;

	try {
		config = JSON.parse( fs.readFileSync( filename() ) );
	} catch ( e ) {
		debug( 'No config, creating empty' );
		config = {};
	}

	if ( section ) {
		if ( config[section] ) {
			debug( 'Section ' + section, config[section] );
			return config[section];
		}

		debug( 'Section ' + section + ' doesnt exist - using defaults', defaults );
		return defaults;
	}

	return config;
}

module.exports = {
	set: setConfig,
	get: getConfig,
};
