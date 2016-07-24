'use strict';

/**
 * Controller for TechNote
 **/
techNoteModule.controller('TechNoteCtrl', ['TechNote',  'Sprint', 'Application', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(TechNote, Sprint, Application, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Sprint',  'Application',     // edition mode
    $scope.mode = null;
    
	// list of techNotes
    $scope.techNotes = [];
	// techNote to edit
    $scope.techNote = null;

	// referencies entities
	$scope.items = {};
    // sprints
	$scope.items.sprints = [];
    // applications
	$scope.items.applications = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Sprint.getAllAsListItems().then(
				function(success) {
        	        $scope.items.sprints = success.data;
            	}, 
	            MessageHandler.manageError);
		Application.getAllAsListItems().then(
				function(success) {
        	        $scope.items.applications = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh techNotes list
     */
    $scope.refreshTechNoteList = function() {
    	try {
			$scope.techNotes = [];
        	TechNote.getAll().then(
				function(success) {
        	        $scope.techNotes = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh techNote
     */
    $scope.refreshTechNote = function(id) {
    	try {
        	$scope.techNote = null;
	        TechNote.get(id).then(
				function(success) {
        	        $scope.techNote = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the techNotes list page
     */
    $scope.goToTechNoteList = function() {
        $scope.refreshTechNoteList();
        $location.path('/techNote');
    }
    /**
     * Go to the techNote edit page
     */
    $scope.goToTechNote = function(id) {
        $scope.refreshTechNote(id);
        $location.path('/techNote/'+id);
    }

    // Actions

    /**
     * Save techNote
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = TechNote.create;
			} else {
				save = TechNote.update;
			}
			save($scope.techNote).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.techNote = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete techNote
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    TechNote.delete(id).then(
				function(success) {
                	$scope.goToTechNoteList();
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
        $scope.techNote = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshTechNote($routeParams.id);
    } else {
        // List page
        $scope.refreshTechNoteList();
    }
    
    
}]);
