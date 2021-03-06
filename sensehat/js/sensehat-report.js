/* eslint-disable no-var, no-undef */

window.SenseHatChart = function( url, svgId, label ) {
	var data;
	var svg = d3.select( document.getElementById( svgId ) );

	d3.json( url, function( error, json ) {
		if ( error ) {
			throw error;
		}

		var parseTime = d3.timeParse( '%Y-%m-%d %H:%M:%S' );
		data = json.map( function( d ) {
			d.timestamp = parseTime( d.timestamp );
			return d;
		} );

		d3.select( window ).on( 'resize', updateGraph );
		updateGraph();
	} );

	function updateGraph() {
		// remove old graph
		svg.select( 'g' ).remove();

		// fit svg into the available space
		var widthEntryContent = document.getElementsByClassName( 'entry-content' )[ 0 ].offsetWidth;
		svg
			.attr( 'width', widthEntryContent )
			.attr( 'height', widthEntryContent * 0.5 );

		// create new graph with default margins
		var margin = { top: 20, right: 20, bottom: 30, left: 50 };
		var width = +svg.attr( 'width' ) - margin.left - margin.right;
		var height = +svg.attr( 'height' ) - margin.top - margin.bottom;
		var g = svg
			.append( 'g' )
			.attr( 'transform', 'translate(' + margin.left + ',' + margin.top + ')' );

		// set the scales
		// https://medium.com/@mbostock/introducing-d3-scale-61980c51545f#.jsxmy6ubi
		var x = d3.scaleTime()
			.rangeRound( [ 0, width ] )
			.domain( d3.extent( data, function( d ) {
				return d.timestamp;
			} ) );

		var y = d3.scaleLinear()
			.rangeRound( [ height, 0 ] )
			.domain( d3.extent( data, function( d ) {
				return d.temperature;
			} ) );

		var line = d3.line()
			.x( function( d ) {
				return x( d.timestamp );
			} )
			.y( function( d ) {
				return y( d.temperature );
			} );

		g.append( 'g' )
			.attr( 'transform', 'translate(0,' + height + ')' )
			.call( d3.axisBottom( x ) );
			// .call( d3.axisBottom( x ) )
			// .select( '.domain' )
			// .remove();

		g.append( 'g' )
			.call( d3.axisLeft( y ) )
			.append( 'text' )
			.attr( 'fill', '#000' )
			.attr( 'transform', 'rotate(-90)' )
			.attr( 'y', 6 )
			.attr( 'dy', '0.71em' )
			.attr( 'text-anchor', 'end' )
			.text( label );

		g.append( 'path' )
			.datum( data )
			.attr( 'fill', 'none' )
			.attr( 'stroke', 'steelblue' )
			.attr( 'stroke-linejoin', 'round' )
			.attr( 'stroke-linecap', 'round' )
			.attr( 'stroke-width', 1.5 )
			.attr( 'd', line );
	}
};
