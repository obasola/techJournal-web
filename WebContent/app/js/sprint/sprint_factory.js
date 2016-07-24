'use strict';

/**
 * Factory for Sprint
 */
sprintModule.factory('Sprint', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage sprint
    var entityURL = restURL + '/sprint';
	
	/**
     * Validate sprint
     * @param sprint sprint
     * @throws validation exception
     */
	var validate = function (sprint) {
		var errors = [];

		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all sprints as list items
         * @return all sprints as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/sprint');
    	},

        /**
         * Get all sprints
         * @return all sprints
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get sprint
         * @param id id
         * @return sprint
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new sprint
         * @param sprint sprint
         * @return sprint saved
         */
		create: function(sprint) {
			validate(sprint)
			var url = entityURL;
			return $http.post(url, sprint);
    	},

        /**
         * Update sprint
         * @param sprint sprint
         * @return sprint saved
         */
    	update: function(sprint) {
			validate(sprint)
			var url = entityURL + '/' + sprint.id;
			return $http.put(url, sprint);
    	},

		/**
         * Delete sprint
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

