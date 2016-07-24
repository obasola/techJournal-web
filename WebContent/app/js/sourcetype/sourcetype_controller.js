'use strict';

/**
 * Controller for SourceType
 **/
sourceTypeModule.controller('SourceTypeCtrl', ['SourceType',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(SourceType, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of sourceTypes
    $scope.sourceTypes = [];
	// sourceType to edit
    $scope.sourceType = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh sourceTypes list
     */
    $scope.refreshSourceTypeList = function() {
    	try {
			$scope.sourceTypes = [];
        	SourceType.getAll().then(
				function(success) {
        	        $scope.sourceTypes = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh sourceType
     */
    $scope.refreshSourceType = function(id) {
    	try {
        	$scope.sourceType = null;
	        SourceType.get(id).then(
				function(success) {
        	        $scope.sourceType = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the sourceTypes list page
     */
    $scope.goToSourceTypeList = function() {
        $scope.refreshSourceTypeList();
        $location.path('/sourceType');
    }
    /**
     * Go to the sourceType edit page
     */
    $scope.goToSourceType = function(id) {
        $scope.refreshSourceType(id);
        $location.path('/sourceType/'+id);
    }

    // Actions

    /**
     * Save sourceType
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = SourceType.create;
			} else {
				save = SourceType.update;
			}
			save($scope.sourceType).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.sourceType = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete sourceType
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    SourceType.delete(id).then(
				function(success) {
                	$scope.goToSourceTypeList();
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
        $scope.sourceType = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshSourceType($routeParams.id);
    } else {
        // List page
        $scope.refreshSourceTypeList();
    }
    
    
}]);
