var qs = require('querystring'),
	util = require('util'),
	extend = require('xtend'),
	httpURL = require('./url-lib.js');

var SEARCH_URL = "http://itunes.apple.com/search?";
var LOOKUP_URL = "http://itunes.apple.com/lookup?";

// Exported Enums
var MEDIA_TYPES = exports.MEDIA_TYPES = {
	MOVIE: 'movie', 
	PODCAST: 'podcast', 
	MUSIC: 'music',
	MUSIC_VIDEO: 'musicVideo', 
	AUDIOBOOK: 'audiobook', 
	SHORT_FILM: 'shortFilm', 
	TV_SHOW: 'tvShow', 
	SOFTWARE: 'software', 
	EBOOK: 'ebook', 
	ALL: 'all'
};

// Settings
var DEFAULT_OPTIONS = {
	'country': 'US',
	'limit': 50
};
// The number of results returned by the remote API
var setResultLimit = exports.setResultLimit = function ( limit ) {
	DEFAULT_OPTIONS.limit = limit;
};
// See http://en.wikipedia.org/wiki/ ISO_3166-1_alpha-2 for a list of ISO Country Codes.
var setCountry = exports.setCountry = function ( country ) {
	DEFAULT_OPTIONS.country = country;
}

// Internal request helper
var request = function ( url, params, callback ) {

	var allParams = extend( {}, DEFAULT_OPTIONS, params );

	var fullURL = url + qs.stringify( allParams );
	console.log('Attempting request to: ' + fullURL);

	httpURL.request( fullURL, function ( body, res ) {
		//console.log('Response body: ' + body);
		var result = JSON.parse( body );

		// Check if there are no results
		if ( result.resultCount === 0 ) {

			console.log('No results.');
			// Execute the callback with null results
			callback( null );
		} else {

			console.log( 'Num Results: ' + result.resultCount );
			// Execute the callback returning only the parsed result objects
			callback( result.results );
		}
	});
};

// Search Helpers
var search = exports.search = function ( term, params, callback ) {
	var searchOptions = {
		'term': term
	};
	extend( searchOptions, params );

	request( SEARCH_URL, searchOptions, callback );
};
var searchMedia = exports.searchMedia = function ( term, media, callback ) {
	var mediaOptions = {
		'media': media
	};

	search( term, mediaOptions, callback );
}
// Search Exports
exports.searchMovie = function ( term, callback ) {
	searchMedia( term, MEDIA_TYPES.MOVIE, callback );
};
exports.searchPodcast = function ( term, callback ) {
	searchMedia( term, MEDIA_TYPES.PODCAST, callback );
};
exports.searchMusic = function ( term, callback ) {
	searchMedia( term, MEDIA_TYPES.MUSIC, callback );
};
exports.searchMusicVideo = function ( term, callback ) {
	searchMedia( term, MEDIA_TYPES.MUSIC_VIDEO, callback );
};
exports.searchAudiobook = function ( term, callback ) {
	searchMedia( term, MEDIA_TYPES.AUDIOBOOK, callback );
};
exports.searchShortFilm = function ( term, callback ) {
	searchMedia( term, MEDIA_TYPES.SHORT_FILM, callback );
};
exports.searchTV = function ( term, callback ) {
	searchMedia( term, MEDIA_TYPES.TV_SHOW, callback );
};
exports.searchSoftware = function ( term, callback ) {
	searchMedia( term, MEDIA_TYPES.SOFTWARE, callback );
};
exports.searchEbook = function ( term, callback ) {
	searchMedia( term, MEDIA_TYPES.EBOOK, callback );
};


// Lookup Exports
exports.lookupById = function ( id, callback ) {
	var params = {
		'id': id
	};

	request( LOOKUP_URL, params, callback );
};
exports.lookupByISBN = function ( ISBN, callback ) {
	var params = {
		'isbn': ISBN
	};

	request( LOOKUP_URL, params, callback );
};
exports.lookupByUPC = function ( UPC, callback ) {
	var params = {
		'upc': UPC
	};

	request( LOOKUP_URL, params, callback );
};
exports.lookupByArtistAMG = function ( artistAMG, callback ) {
	var params = {
		'amgArtist': artistAMG
	};

	request( LOOKUP_URL, params, callback );
};
exports.lookupByAlbumAMG = function ( albumAMG, callback ) {
	var params = {
		'amgAlbum': albumAMG
	};

	request( LOOKUP_URL, params, callback );
};