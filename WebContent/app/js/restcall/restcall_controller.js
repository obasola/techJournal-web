'use strict';

/**
 * Controller for RestCall
 **/
restCallModule.controller('RestCallCtrl', ['RestCall',  'ReleaseNote', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(RestCall, ReleaseNote, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'ReleaseNote',     // edition mode
    $scope.mode = null;
    
	// list of restCalls
    $scope.restCalls = [];
	// restCall to edit
    $scope.restCall = null;

	// referencies entities
	$scope.items = {};
    // releaseNotes
	$scope.items.releaseNotes = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		ReleaseNote.getAllAsListItems().then(
				function(success) {
        	        $scope.items.releaseNotes = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh restCalls list
     */
    $scope.refreshRestCallList = function() {
    	try {
			$scope.restCalls = [];
        	RestCall.getAll().then(
				function(success) {
        	        $scope.restCalls = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh restCall
     */
    $scope.refreshRestCall = function(id) {
    	try {
        	$scope.restCall = null;
	        RestCall.get(id).then(
				function(success) {
        	        $scope.restCall = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the restCalls list page
     */
    $scope.goToRestCallList = function() {
        $scope.refreshRestCallList();
        $location.path('/restCall');
    }
    /**
     * Go to the restCall edit page
     */
    $scope.goToRestCall = function(id) {
        $scope.refreshRestCall(id);
        $location.path('/restCall/'+id);
    }

    // Actions

    /**
     * Save restCall
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = RestCall.create;
			} else {
				save = RestCall.update;
			}
			save($scope.restCall).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.restCall = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete restCall
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    RestCall.delete(id).then(
				function(success) {
                	$scope.goToRestCallList();
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
        $scope.restCall = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshRestCall($routeParams.id);
    } else {
        // List page
        $scope.refreshRestCallList();
    }
    
    
}]);
