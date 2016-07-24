'use strict';

/**
 * Controller for BatchJob
 **/
batchJobModule.controller('BatchJobCtrl', ['BatchJob',  'ReleaseNote', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(BatchJob, ReleaseNote, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'ReleaseNote',     // edition mode
    $scope.mode = null;
    
	// list of batchJobs
    $scope.batchJobs = [];
	// batchJob to edit
    $scope.batchJob = null;

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
     * Refresh batchJobs list
     */
    $scope.refreshBatchJobList = function() {
    	try {
			$scope.batchJobs = [];
        	BatchJob.getAll().then(
				function(success) {
        	        $scope.batchJobs = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh batchJob
     */
    $scope.refreshBatchJob = function(id) {
    	try {
        	$scope.batchJob = null;
	        BatchJob.get(id).then(
				function(success) {
        	        $scope.batchJob = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the batchJobs list page
     */
    $scope.goToBatchJobList = function() {
        $scope.refreshBatchJobList();
        $location.path('/batchJob');
    }
    /**
     * Go to the batchJob edit page
     */
    $scope.goToBatchJob = function(id) {
        $scope.refreshBatchJob(id);
        $location.path('/batchJob/'+id);
    }

    // Actions

    /**
     * Save batchJob
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = BatchJob.create;
			} else {
				save = BatchJob.update;
			}
			save($scope.batchJob).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.batchJob = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete batchJob
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    BatchJob.delete(id).then(
				function(success) {
                	$scope.goToBatchJobList();
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
        $scope.batchJob = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshBatchJob($routeParams.id);
    } else {
        // List page
        $scope.refreshBatchJobList();
    }
    
    
}]);
