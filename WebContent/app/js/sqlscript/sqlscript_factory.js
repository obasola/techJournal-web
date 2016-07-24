'use strict';

/**
 * Factory for SqlScript
 */
sqlScriptModule.factory('SqlScript', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage sqlScript
    var entityURL = restURL + '/sqlScript';
	
	/**
     * Validate sqlScript
     * @param sqlScript sqlScript
     * @throws validation exception
     */
	var validate = function (sqlScript) {
		var errors = [];
        if( sqlScript.id == null || sqlScript.id == '' ) {
			errors.push('sqlScript.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all sqlScripts as list items
         * @return all sqlScripts as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/sqlScript');
    	},

        /**
         * Get all sqlScripts
         * @return all sqlScripts
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get sqlScript
         * @param id id
         * @return sqlScript
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new sqlScript
         * @param sqlScript sqlScript
         * @return sqlScript saved
         */
		create: function(sqlScript) {
			validate(sqlScript)
			var url = entityURL;
			return $http.post(url, sqlScript);
    	},

        /**
         * Update sqlScript
         * @param sqlScript sqlScript
         * @return sqlScript saved
         */
    	update: function(sqlScript) {
			validate(sqlScript)
			var url = entityURL + '/' + sqlScript.id;
			return $http.put(url, sqlScript);
    	},

		/**
         * Delete sqlScript
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

