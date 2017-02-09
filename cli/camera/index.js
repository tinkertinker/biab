const takePhoto = require( './take-photo' );
const photoToPost = require( './photo-to-post' );
const cameraSettings = require( './camera-settings' );
const schedule = require( './schedule' );

module.exports = function( emitter ) {
	emitter.on( 'takephoto', takePhoto );
	emitter.on( 'phototowp', photoToPost );
	emitter.on( 'camerasettings', cameraSettings );
	emitter.on( 'cameraschedule', schedule );
};
