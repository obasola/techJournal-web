'use strict';

/**
 * Factory for Application
 */
applicationModule.factory('Application', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage application
    var entityURL = restURL + '/application';
	
	/**
     * Validate application
     * @param application application
     * @throws validation exception
     */
	var validate = function (application) {
		var errors = [];

		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all applications as list items
         * @return all applications as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/application');
    	},

        /**
         * Get all applications
         * @return all applications
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get application
         * @param id id
         * @return application
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new application
         * @param application application
         * @return application saved
         */
		create: function(application) {
			validate(application)
			var url = entityURL;
			return $http.post(url, application);
    	},

        /**
         * Update application
         * @param application application
         * @return application saved
         */
    	update: function(application) {
			validate(application)
			var url = entityURL + '/' + application.id;
			return $http.put(url, application);
    	},

		/**
         * Delete application
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

