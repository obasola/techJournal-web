'use strict';

/**
 * Factory for BatchJob
 */
batchJobModule.factory('BatchJob', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage batchJob
    var entityURL = restURL + '/batchJob';
	
	/**
     * Validate batchJob
     * @param batchJob batchJob
     * @throws validation exception
     */
	var validate = function (batchJob) {
		var errors = [];
        if( batchJob.id == null || batchJob.id == '' ) {
			errors.push('batchJob.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all batchJobs as list items
         * @return all batchJobs as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/batchJob');
    	},

        /**
         * Get all batchJobs
         * @return all batchJobs
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get batchJob
         * @param id id
         * @return batchJob
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new batchJob
         * @param batchJob batchJob
         * @return batchJob saved
         */
		create: function(batchJob) {
			validate(batchJob)
			var url = entityURL;
			return $http.post(url, batchJob);
    	},

        /**
         * Update batchJob
         * @param batchJob batchJob
         * @return batchJob saved
         */
    	update: function(batchJob) {
			validate(batchJob)
			var url = entityURL + '/' + batchJob.id;
			return $http.put(url, batchJob);
    	},

		/**
         * Delete batchJob
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

