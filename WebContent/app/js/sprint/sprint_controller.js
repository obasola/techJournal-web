'use strict';

/**
 * Controller for Sprint
 **/
sprintModule.controller('SprintCtrl', ['Sprint',  'Application', '$scope', '$routeParams', '$http', 
                                       '$location', '$cookies', 'MessageHandler', 'restURL', 
         function(Sprint, Application, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 // 'Application',     // edition mode
    $scope.mode = null;
    
	// list of sprints
    $scope.sprints = [];
	// sprint to edit
    $scope.sprint = null;

	// referencies entities
	$scope.items = {};
    // applications
	$scope.items.applications = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Application.getAllAsListItems().then(
				function(success) {
        	        $scope.items.applications = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh sprints list
     */
    $scope.refreshSprintList = function() {
    	try {
			$scope.sprints = [];
        	Sprint.getAll().then(
				function(success) {
        	        $scope.sprints = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh sprint
     */
    $scope.refreshSprint = function(id) {
    	try {
        	$scope.sprint = null;
	        Sprint.get(id).then(
				function(success) {
        	        $scope.sprint = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the sprints list page
     */
    $scope.goToSprintList = function() {
        $scope.refreshSprintList();
        $location.path('/sprint');
    }
    /**
     * Go to the sprint edit page
     */
    $scope.goToSprint = function(id) {
        $scope.refreshSprint(id);
        $location.path('/sprint/'+id);
    }

    // Actions

    /**
     * Save sprint
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Sprint.create;
			} else {
				save = Sprint.update;
			}
			save($scope.sprint).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.sprint = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete sprint
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    Sprint.delete(id).then(
				function(success) {
                	$scope.goToSprintList();
            	}, 
                MessageHandler.manageError);
        } catch(ex) {
            MessageHandler.manageException(ex);
        }
    };
    
    // Main
	MessageHandler.cleanMessage();
    if( $location.path().endsWith('/new') ) {
        // Creation page
        $scope.sprint = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshSprint($routeParams.id);
    } else {
        // List page
        $scope.refreshSprintList();
    }
    
    
}]);
