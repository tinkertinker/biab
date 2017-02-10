const path = require( 'path' );
const cron = require( 'cron' );

function setSensehatCron( wp, schedule ) {
	const cmd = path.resolve( path.join( __dirname, '..', 'biab' ) ) + ' sensehat-capture';
	const success = () => {
		this.emit( 'result', 'scheduled' );
	};
	const error = msg => {
		this.emit( 'error', msg );
	};

	cron( cmd, wp, schedule, success, error );
}

module.exports = setSensehatCron;
