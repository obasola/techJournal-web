'use strict';

/**
 * Controller for SourceCode
 **/
sourceCodeModule.controller('SourceCodeCtrl', ['SourceCode',  'SourceType', 'TechNote', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(SourceCode, SourceType, TechNote, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'SourceType',  'TechNote',     // edition mode
    $scope.mode = null;
    
	// list of sourceCodes
    $scope.sourceCodes = [];
	// sourceCode to edit
    $scope.sourceCode = null;

	// referencies entities
	$scope.items = {};
    // sourceTypes
	$scope.items.sourceTypes = [];
    // techNotes
	$scope.items.techNotes = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		SourceType.getAllAsListItems().then(
				function(success) {
        	        $scope.items.sourceTypes = success.data;
            	}, 
	            MessageHandler.manageError);
		TechNote.getAllAsListItems().then(
				function(success) {
        	        $scope.items.techNotes = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh sourceCodes list
     */
    $scope.refreshSourceCodeList = function() {
    	try {
			$scope.sourceCodes = [];
        	SourceCode.getAll().then(
				function(success) {
        	        $scope.sourceCodes = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh sourceCode
     */
    $scope.refreshSourceCode = function(id) {
    	try {
        	$scope.sourceCode = null;
	        SourceCode.get(id).then(
				function(success) {
        	        $scope.sourceCode = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the sourceCodes list page
     */
    $scope.goToSourceCodeList = function() {
        $scope.refreshSourceCodeList();
        $location.path('/sourceCode');
    }
    /**
     * Go to the sourceCode edit page
     */
    $scope.goToSourceCode = function(id) {
        $scope.refreshSourceCode(id);
        $location.path('/sourceCode/'+id);
    }

    // Actions

    /**
     * Save sourceCode
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = SourceCode.create;
			} else {
				save = SourceCode.update;
			}
			save($scope.sourceCode).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.sourceCode = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete sourceCode
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    SourceCode.delete(id).then(
				function(success) {
                	$scope.goToSourceCodeList();
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
        $scope.sourceCode = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshSourceCode($routeParams.id);
    } else {
        // List page
        $scope.refreshSourceCodeList();
    }
    
    
}]);
