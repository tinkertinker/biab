const schedule = require( './schedule' );
const dataToWP = require( './data-to-wp' );
const capture = require( './capture' );

module.exports = function( emitter ) {
	emitter.on( 'sensehat-capture', capture );
	emitter.on( 'sensehat-reading', dataToWP );
	emitter.on( 'sensehat-schedule', schedule );
};
