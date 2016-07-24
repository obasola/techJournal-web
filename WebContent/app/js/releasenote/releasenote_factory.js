'use strict';

/**
 * Factory for ReleaseNote
 */
releaseNoteModule.factory('ReleaseNote', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage releaseNote
    var entityURL = restURL + '/releaseNote';
	
	/**
     * Validate releaseNote
     * @param releaseNote releaseNote
     * @throws validation exception
     */
	var validate = function (releaseNote) {
		var errors = [];
        if( releaseNote.id == null || releaseNote.id == '' ) {
			errors.push('releaseNote.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all releaseNotes as list items
         * @return all releaseNotes as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/releaseNote');
    	},

        /**
         * Get all releaseNotes
         * @return all releaseNotes
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get releaseNote
         * @param id id
         * @return releaseNote
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new releaseNote
         * @param releaseNote releaseNote
         * @return releaseNote saved
         */
		create: function(releaseNote) {
			validate(releaseNote)
			var url = entityURL;
			return $http.post(url, releaseNote);
    	},

        /**
         * Update releaseNote
         * @param releaseNote releaseNote
         * @return releaseNote saved
         */
    	update: function(releaseNote) {
			validate(releaseNote)
			var url = entityURL + '/' + releaseNote.id;
			return $http.put(url, releaseNote);
    	},

		/**
         * Delete releaseNote
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

