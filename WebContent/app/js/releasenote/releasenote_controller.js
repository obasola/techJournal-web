'use strict';

/**
 * Controller for ReleaseNote
 **/
releaseNoteModule.controller('ReleaseNoteCtrl', ['ReleaseNote',  'TechNote', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(ReleaseNote, TechNote, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'TechNote',     // edition mode
    $scope.mode = null;
    
	// list of releaseNotes
    $scope.releaseNotes = [];
	// releaseNote to edit
    $scope.releaseNote = null;

	// referencies entities
	$scope.items = {};
    // techNotes
	$scope.items.techNotes = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		TechNote.getAllAsListItems().then(
				function(success) {
        	        $scope.items.techNotes = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh releaseNotes list
     */
    $scope.refreshReleaseNoteList = function() {
    	try {
			$scope.releaseNotes = [];
        	ReleaseNote.getAll().then(
				function(success) {
        	        $scope.releaseNotes = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh releaseNote
     */
    $scope.refreshReleaseNote = function(id) {
    	try {
        	$scope.releaseNote = null;
	        ReleaseNote.get(id).then(
				function(success) {
        	        $scope.releaseNote = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the releaseNotes list page
     */
    $scope.goToReleaseNoteList = function() {
        $scope.refreshReleaseNoteList();
        $location.path('/releaseNote');
    }
    /**
     * Go to the releaseNote edit page
     */
    $scope.goToReleaseNote = function(id) {
        $scope.refreshReleaseNote(id);
        $location.path('/releaseNote/'+id);
    }

    // Actions

    /**
     * Save releaseNote
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = ReleaseNote.create;
			} else {
				save = ReleaseNote.update;
			}
			save($scope.releaseNote).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.releaseNote = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete releaseNote
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    ReleaseNote.delete(id).then(
				function(success) {
                	$scope.goToReleaseNoteList();
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
        $scope.releaseNote = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshReleaseNote($routeParams.id);
    } else {
        // List page
        $scope.refreshReleaseNoteList();
    }
    
    
}]);
