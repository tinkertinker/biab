const debug = require( 'debug' )( 'biab:camera:photo-to-post' );

const getPhotoName = () => 'photo-' + process.pid + '.jpg';
const getPostTitle = () => new Date().toLocaleString();

function getImageContent( media ) {
	const { width, height } = media.media_details.sizes.large;
	const sized = media.source_url.replace( '.jpg', `-${ width }x${ height }.jpg` );

	return `<img src="${ sized }" width="${ width }" height="${ height }" />`;
}

function createPost( wordpress, emitter, media ) {
	debug( 'Creating post' );

	wordpress
		.posts()
		.create( {
			title: getPostTitle(),
			featured_media: media.id,
			content: getImageContent( media ),
			status: 'publish',
		} )
		.then( response => {
			debug( 'Post ' + response.id + ' created: ' + response.link );
			emitter.emit( 'result', JSON.stringify( { id: response.id } ) );
		} )
		.catch( error => {
			emitter.emit( 'error', 'Unable to save photo to WP - ' + error.message );
		})
}

function uploadPhoto( wp, commandData, photo ) {
	debug( 'Uploading photo' );

	wp.media()
		.file( photo, getPhotoName() )
		.create()
		.then( response => {
			debug( 'Photo ' + response.id + ' uploaded: ' + response.source_url );
			createPost( wp, this, response );
		} )
		.catch( error => {
			this.emit( 'error', 'Unable to save photo to WP - ' + error.message );
		} );
}

module.exports = uploadPhoto;
