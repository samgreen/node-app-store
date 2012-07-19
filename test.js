var store = require('./app-store.js');

// store.search( 'game', function ( results ) {
// 	console.log('game results: ' + results);
// });

// store.searchMovie('kill', function ( results ) {
// 	console.log('movie results: ' + results);
// });

store.setResultLimit(3);

store.searchSoftware('fun', function ( results ) {
	console.log('software results: ' + results);

	for ( var i = 0; i < results.length; i++ ) {

		var software = results[ i ];
		console.log( i + '. Title: ' + software.trackName );
		console.log( i + '. Developer: ' + software.artistName );
	}
});