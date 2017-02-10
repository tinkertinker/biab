const WPAPI = require( 'wpapi' );
const auth = require( '../auth.json' );
const config = require( 'config' );

const wordpress = config.get( 'wordpress', { rest: 'http://127.0.0.1/wp-json/' } );
const wp = new WPAPI( {
	username: auth.username,
	password: auth.password,
	endpoint: wordpress.rest,
} );

module.exports = wp;
