'use strict';

/**
 * Controller for Application
 **/
applicationModule.controller('ApplicationCtrl', ['Application',  '$scope', '$routeParams', '$http', '$location', 
                                                 '$cookies', 'MessageHandler', 'restURL', 
                 function(Application, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of applications
    $scope.applications = [];
	// application to edit
    $scope.application = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh applications list
     */
    $scope.refreshApplicationList = function() {
    	try {
			$scope.applications = [];
        	Application.getAll().then(
				function(success) {
        	        $scope.applications = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh application
     */
    $scope.refreshApplication = function(id) {
    	try {
        	$scope.application = null;
	        Application.get(id).then(
				function(success) {
        	        $scope.application = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the applications list page
     */
    $scope.goToApplicationList = function() {
        $scope.refreshApplicationList();
        $location.path('/application');
    }
    /**
     * Go to the application edit page
     */
    $scope.goToApplication = function(id) {
        $scope.refreshApplication(id);
        $location.path('/application/'+id);
    }

    // Actions

    /**
     * Save application
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Application.create;
			} else {
				save = Application.update;
			}
			save($scope.application).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.application = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete application
     */
    $scope.deleteRecord = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    Application.deleteRecord(id).then(
				function(success) {
                	$scope.goToApplicationList();
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
        $scope.application = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshApplication($routeParams.id);
    } else {
        // List page
        $scope.refreshApplicationList();
    }
    
    
}]);
