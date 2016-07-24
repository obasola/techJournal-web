'use strict';

/**
 * Controller for SqlScript
 **/
sqlScriptModule.controller('SqlScriptCtrl', ['SqlScript',  'ReleaseNote', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(SqlScript, ReleaseNote, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'ReleaseNote',     // edition mode
    $scope.mode = null;
    
	// list of sqlScripts
    $scope.sqlScripts = [];
	// sqlScript to edit
    $scope.sqlScript = null;

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
     * Refresh sqlScripts list
     */
    $scope.refreshSqlScriptList = function() {
    	try {
			$scope.sqlScripts = [];
        	SqlScript.getAll().then(
				function(success) {
        	        $scope.sqlScripts = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh sqlScript
     */
    $scope.refreshSqlScript = function(id) {
    	try {
        	$scope.sqlScript = null;
	        SqlScript.get(id).then(
				function(success) {
        	        $scope.sqlScript = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the sqlScripts list page
     */
    $scope.goToSqlScriptList = function() {
        $scope.refreshSqlScriptList();
        $location.path('/sqlScript');
    }
    /**
     * Go to the sqlScript edit page
     */
    $scope.goToSqlScript = function(id) {
        $scope.refreshSqlScript(id);
        $location.path('/sqlScript/'+id);
    }

    // Actions

    /**
     * Save sqlScript
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = SqlScript.create;
			} else {
				save = SqlScript.update;
			}
			save($scope.sqlScript).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.sqlScript = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete sqlScript
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    SqlScript.delete(id).then(
				function(success) {
                	$scope.goToSqlScriptList();
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
        $scope.sqlScript = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshSqlScript($routeParams.id);
    } else {
        // List page
        $scope.refreshSqlScriptList();
    }
    
    
}]);
