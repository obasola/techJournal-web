'use strict';

/**
 * Factory for SourceCode
 */
sourceCodeModule.factory('SourceCode', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage sourceCode
    var entityURL = restURL + '/sourceCode';
	
	/**
     * Validate sourceCode
     * @param sourceCode sourceCode
     * @throws validation exception
     */
	var validate = function (sourceCode) {
		var errors = [];
        if( sourceCode.id == null || sourceCode.id == '' ) {
			errors.push('sourceCode.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all sourceCodes as list items
         * @return all sourceCodes as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/sourceCode');
    	},

        /**
         * Get all sourceCodes
         * @return all sourceCodes
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get sourceCode
         * @param id id
         * @return sourceCode
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new sourceCode
         * @param sourceCode sourceCode
         * @return sourceCode saved
         */
		create: function(sourceCode) {
			validate(sourceCode)
			var url = entityURL;
			return $http.post(url, sourceCode);
    	},

        /**
         * Update sourceCode
         * @param sourceCode sourceCode
         * @return sourceCode saved
         */
    	update: function(sourceCode) {
			validate(sourceCode)
			var url = entityURL + '/' + sourceCode.id;
			return $http.put(url, sourceCode);
    	},

		/**
         * Delete sourceCode
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

