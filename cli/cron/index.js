/**
 * External dependencies
 */

const debug = require( 'debug' )( 'biab:cron' );
const exec = require( 'child_process' ).exec;

const splitSchedule = sched => sched.split( ' ' );
const getInterval = sched => splitSchedule( sched ).length > 0 ? Math.max( 0, parseInt( splitSchedule( sched )[0], 10 ) ) : 0;
const getPeriod = sched => splitSchedule( sched ).length > 1 ? splitSchedule( sched )[1] : false;
const isValidPeriod = period => [ 'minute', 'hour', 'day' ].includes( period );

function intervalAsCron( interval, period ) {
	if ( period === 'minute' ) {
		return `*/${ Math.min( interval, 59 ) } * * * *`;
	} else if ( period === 'hour' ) {
		return `* */${ Math.min( interval, 23 ) } * * *`;
	} else if ( period === 'day' ) {
		return `* * */${ interval } * *`;
	}
}

function updateCrontab( command, interval, success_cb, error_cb ) {
	const cmd = `( crontab -l | grep -v -F "${ command }" ; echo "${ interval } ${ command }" ) | crontab -`;

	debug( 'Adding to cron: ' + interval );
	debug( 'Crontab comamnd: ' + cmd );

	exec( cmd, ( error, stdout ) => {
		if ( error ) {
			return error_cb( 'Failed to schedule: ' + error.message );
		}

		return success_cb();
	} );
}

function removeCrontab( command, success_cb, error_cb ) {
	const cmd = `( crontab -l | grep -v -F "${ command }" ) | crontab -`;

	debug( 'Removing from cron' );
	debug( 'Crontab comamnd: ' + cmd );

	exec( cmd, ( error, stdout ) => {
		if ( error ) {
			return error_cb( 'Failed to schedule: ' + error.message );
		}

		return success_cb();
	} );
}

module.exports = function( command, schedule, success, error ) {
	const interval = getInterval( schedule );
	const period = getPeriod( schedule );

	debug( `Cron schedule: "${ schedule }" => ${ interval } ${ period }` );

	if ( interval > 0 && isValidPeriod( period ) ) {
		return updateCrontab( command, intervalAsCron( interval, period ), success, error );
	}

	return removeCrontab( command, success, error );
}
