# Node App (iTunes) Store Search #

This package will allow you to utilize the iTunes search APIs in any of your nodejs projects. It was designed to be as easy to use as possible.

### Getting Started ###

Simply clone this repo in to your node_modules directory and require the file. Then you can easily search the iTunes store.


### Usage ###

    var store = require( 'app-store' );
    
    store.searchSoftware( 'fun', function ( results ) {
        var software = results[ 0 ];
        console.log( '%d. Title: %s', i, software.trackName );
    });

### Setup ###

The default result limit is set to 10 results. You can change this yourself by calling `setResultLimit` on the object, prior to executing any queries. The following search functions are available.

    // Set default result limit to 100 objects
    store.setResultLimit( 100 );

The default country is set to USA. You can change this by calling `setCountry` on the object. The parameter should be an ISO 3166 (http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code.

    // Set country to Canada
    store.setCountry( 'CA' );

### Documentation ###

The following search methods are available:

 * `searchMovie`
 * `searchPodcast`
 * `searchMusic`
 * `searchMusicVideo`
 * `searchAudiobook`
 * `searchShortFilm`
 * `searchTV`
 * `searchSoftware`
 * `searchEbook`

If you need to look up an item by unique identifier, instead of a general search term, the following methods are available:

 * `lookupById` - Use this function if you have already obtained the unique iTunes id for a specific item.
 * `lookupByISBN`
 * `lookupByUPC`
 * `lookupByArtistAMG`

**Note:** that Apple recommends caching returned search results to reduce strain on their servers. This project does not cache results for you, although an update is planned to implement this feature.