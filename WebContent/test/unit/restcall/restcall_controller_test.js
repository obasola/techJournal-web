'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('restCall.module'));
  
  describe('RestCallCtrl', function(){
    var RestCallCtrl, RestCall, ReleaseNote, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// RestCall service
    	RestCall = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'restCall1'});
    			return deferred.promise;
    		}
    	};
		
				ReleaseNote = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				RestCallCtrl = $controller('RestCallCtrl', {
    		'RestCall': RestCall,
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
    	expect($scope.restCall).toBeNull();
    	expect($scope.restCalls).toBe('restCall1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshRestCallList', function() {
    	// given
    	RestCall.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'restCall2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshRestCallList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.restCalls).toBe('restCall2');
    });
    
    it('refreshRestCall', function() {
    	// given
    	RestCall.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'restCall'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshRestCall('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.restCall).toBe('restCall'+'1');
    });
    
	it('goToRestCallList', function() {
    	// given
    	spyOn($scope, "refreshRestCallList");
    	
    	// when
    	$scope.goToRestCallList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshRestCallList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/restCall');
    });
    
    it('goToRestCall', function() {
    	// given
    	spyOn($scope, "refreshRestCall");
    	var id = 1;
    	
    	// when
    	$scope.goToRestCall(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshRestCall).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/restCall'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.restCall = {id:'1', name:'restCall'};
    	
    	$scope.mode = 'create';
    	RestCall.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'restCallSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.restCall).toBe('restCallSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.restCall = {id:'1', name:'restCall'};
    	
    	$scope.mode = 'update';
    	RestCall.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'restCallSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.restCall).toBe('restCallSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	RestCall.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToRestCallList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToRestCallList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : restCall create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/restCall/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.restCall).toBeNull();
    	expect($scope.restCalls).toBe('restCall1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});