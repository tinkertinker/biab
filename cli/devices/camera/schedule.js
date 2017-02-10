const path = require( 'path' );
const cron = require( 'cron' );

function setCameraCron( wp, schedule ) {
	const cmd = path.resolve( path.join( __dirname, '..', 'biab' ) ) + ' camera-take-photo';
	const success = () => {
		this.emit( 'result', 'scheduled' );
	};
	const error = msg => {
		this.emit( 'error', msg );
	};

	cron( cmd, wp, schedule, success, error );
}

module.exports = setCameraCron;
