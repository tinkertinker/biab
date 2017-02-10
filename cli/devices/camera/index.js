const debug = require( 'debug' )( 'biab:camera' );

const takePhoto = require( './take-photo' );
const takeSnapshot = require( './take-snapshot' );
const photoToPost = require( './photo-to-post' );
const cameraSettings = require( './camera-settings' );
const schedule = require( './schedule' );

function returnPost( wp, post ) {
	this.emit( 'result', JSON.stringify( { id: post.id } ) );
}

module.exports = function( emitter ) {
	debug( 'Enabling camera' );

	emitter.on( 'camera-take-photo', takePhoto );
	emitter.on( 'camera-snapshot', takeSnapshot );
	emitter.on( 'photo-to-wp', photoToPost );
	emitter.on( 'photo-published', returnPost );
	emitter.on( 'camera-settings', cameraSettings );
	emitter.on( 'camera-schedule', schedule );
};
