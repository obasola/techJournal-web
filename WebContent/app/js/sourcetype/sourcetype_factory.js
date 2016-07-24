'use strict';

/**
 * Factory for SourceType
 */
sourceTypeModule.factory('SourceType', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage sourceType
    var entityURL = restURL + '/sourceType';
	
	/**
     * Validate sourceType
     * @param sourceType sourceType
     * @throws validation exception
     */
	var validate = function (sourceType) {
		var errors = [];
        if( sourceType.id == null || sourceType.id == '' ) {
			errors.push('sourceType.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all sourceTypes as list items
         * @return all sourceTypes as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/sourceType');
    	},

        /**
         * Get all sourceTypes
         * @return all sourceTypes
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get sourceType
         * @param id id
         * @return sourceType
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new sourceType
         * @param sourceType sourceType
         * @return sourceType saved
         */
		create: function(sourceType) {
			validate(sourceType)
			var url = entityURL;
			return $http.post(url, sourceType);
    	},

        /**
         * Update sourceType
         * @param sourceType sourceType
         * @return sourceType saved
         */
    	update: function(sourceType) {
			validate(sourceType)
			var url = entityURL + '/' + sourceType.id;
			return $http.put(url, sourceType);
    	},

		/**
         * Delete sourceType
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

