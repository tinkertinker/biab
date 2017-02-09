<?php

require_once '/opt/wp/wp-config.php';

function sense_hat_insert_temperature( $data ) {
	global $wpdb;

	$values = json_decode( $data );

	$wpdb->insert( 'wp_sense_hat',
		array(
			'temperature'  => $values->temperature,
			'humidity'     => $values->humidity,
			'air_pressure' => $values->pressure,
		),
		array(
			'%f',
			'%f',
			'%f',
		 )
	);
}

sense_hat_insert_temperature( $argv[1] );
