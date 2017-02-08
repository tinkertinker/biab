<?php

require_once( '/opt/wp/wp-config.php' );

function sense_hat_insert_temperature() {
	$values = explode(',', shell_exec( '/opt/bloginabox/sensehat/take-values.py' ));
	global $wpdb;
	$wpdb->insert( 'wp_sense_hat',
		array(
			'temperature' => $values[0],
			'humidity' => $values[1],
			'air_pressure' => $values[2]
		),
		array(
			'%f',
			'%f',
			'%f',
		 )
	);
}

sense_hat_insert_temperature();

?>
