'use strict';

/**
 * Factory for TechNote
 */
techNoteModule.factory('TechNote', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage techNote
    var entityURL = restURL + '/techNote';
	
	/**
     * Validate techNote
     * @param techNote techNote
     * @throws validation exception
     */
	var validate = function (techNote) {
		var errors = [];
        if( techNote.id == null || techNote.id == '' ) {
			errors.push('techNote.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all techNotes as list items
         * @return all techNotes as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/techNote');
    	},

        /**
         * Get all techNotes
         * @return all techNotes
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get techNote
         * @param id id
         * @return techNote
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new techNote
         * @param techNote techNote
         * @return techNote saved
         */
		create: function(techNote) {
			validate(techNote)
			var url = entityURL;
			return $http.post(url, techNote);
    	},

        /**
         * Update techNote
         * @param techNote techNote
         * @return techNote saved
         */
    	update: function(techNote) {
			validate(techNote)
			var url = entityURL + '/' + techNote.id;
			return $http.put(url, techNote);
    	},

		/**
         * Delete techNote
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

