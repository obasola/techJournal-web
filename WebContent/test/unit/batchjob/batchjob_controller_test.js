'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('batchJob.module'));
  
  describe('BatchJobCtrl', function(){
    var BatchJobCtrl, BatchJob, ReleaseNote, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
    beforeEach(inject(function($injector) {
    	$controller = $injector.get('$controller');
    	$q = $injector.get('$q');
    	$rootScope = $injector.get('$rootScope');
    	$scope = $rootScope.$new();
    	$routeParams = $injector.get('$routeParams');
    	$httpBackend = $injector.get('$httpBackend');
    	
    	// location is mocked due to redirection in browser : karma does not support it
    	$location = {
    		path: jasmine.createSpy("path").andCallFake(function() {
        	    return "";
        	})
    	};
    	
    	// Messages
    	MessageHandler = {
    		cleanMessage: jasmine.createSpy("cleanMessage"),
    		addSuccess: jasmine.createSpy("addSuccess"),
    		manageError: jasmine.createSpy("manageError"),
    		manageException: jasmine.createSpy("manageException"),
    	};

    	// BatchJob service
    	BatchJob = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'batchJob1'});
    			return deferred.promise;
    		}
    	};
		
				ReleaseNote = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				BatchJobCtrl = $controller('BatchJobCtrl', {
    		'BatchJob': BatchJob,
						'ReleaseNote': ReleaseNote,
			    		'$scope': $scope,
    		'$routeParams': $routeParams,
    		'$http': $httpBackend,
    		'$location': $location,
    		'MessageHandler': MessageHandler
    	});
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
    it('init', function() {
    	$rootScope.$apply();
    	expect($scope.mode).toBeNull();
    	expect($scope.batchJob).toBeNull();
    	expect($scope.batchJobs).toBe('batchJob1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshBatchJobList', function() {
    	// given
    	BatchJob.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'batchJob2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshBatchJobList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.batchJobs).toBe('batchJob2');
    });
    
    it('refreshBatchJob', function() {
    	// given
    	BatchJob.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'batchJob'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshBatchJob('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.batchJob).toBe('batchJob'+'1');
    });
    
	it('goToBatchJobList', function() {
    	// given
    	spyOn($scope, "refreshBatchJobList");
    	
    	// when
    	$scope.goToBatchJobList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshBatchJobList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/batchJob');
    });
    
    it('goToBatchJob', function() {
    	// given
    	spyOn($scope, "refreshBatchJob");
    	var id = 1;
    	
    	// when
    	$scope.goToBatchJob(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshBatchJob).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/batchJob'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.batchJob = {id:'1', name:'batchJob'};
    	
    	$scope.mode = 'create';
    	BatchJob.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'batchJobSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.batchJob).toBe('batchJobSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.batchJob = {id:'1', name:'batchJob'};
    	
    	$scope.mode = 'update';
    	BatchJob.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'batchJobSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.batchJob).toBe('batchJobSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	BatchJob.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToBatchJobList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToBatchJobList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : batchJob create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/batchJob/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.batchJob).toBeNull();
    	expect($scope.batchJobs).toBe('batchJob1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});