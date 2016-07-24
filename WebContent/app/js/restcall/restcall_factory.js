'use strict';

/**
 * Factory for RestCall
 */
restCallModule.factory('RestCall', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage restCall
    var entityURL = restURL + '/restCall';
	
	/**
     * Validate restCall
     * @param restCall restCall
     * @throws validation exception
     */
	var validate = function (restCall) {
		var errors = [];
        if( restCall.id == null || restCall.id == '' ) {
			errors.push('restCall.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all restCalls as list items
         * @return all restCalls as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/restCall');
    	},

        /**
         * Get all restCalls
         * @return all restCalls
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get restCall
         * @param id id
         * @return restCall
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new restCall
         * @param restCall restCall
         * @return restCall saved
         */
		create: function(restCall) {
			validate(restCall)
			var url = entityURL;
			return $http.post(url, restCall);
    	},

        /**
         * Update restCall
         * @param restCall restCall
         * @return restCall saved
         */
    	update: function(restCall) {
			validate(restCall)
			var url = entityURL + '/' + restCall.id;
			return $http.put(url, restCall);
    	},

		/**
         * Delete restCall
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

