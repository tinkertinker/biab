const WPAPI = require( 'wpapi' );
const auth = require( '../auth.json' );
const wp = new WPAPI( auth );

module.exports = wp;
