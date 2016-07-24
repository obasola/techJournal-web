'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('application.module'));
  
  describe('ApplicationCtrl', function(){
    var ApplicationCtrl, Application,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Application service
    	Application = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'application1'});
    			return deferred.promise;
    		}
    	};
		
				ApplicationCtrl = $controller('ApplicationCtrl', {
    		'Application': Application,
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
    	expect($scope.application).toBeNull();
    	expect($scope.applications).toBe('application1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshApplicationList', function() {
    	// given
    	Application.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'application2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshApplicationList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.applications).toBe('application2');
    });
    
    it('refreshApplication', function() {
    	// given
    	Application.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'application'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshApplication('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.application).toBe('application'+'1');
    });
    
	it('goToApplicationList', function() {
    	// given
    	spyOn($scope, "refreshApplicationList");
    	
    	// when
    	$scope.goToApplicationList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshApplicationList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/application');
    });
    
    it('goToApplication', function() {
    	// given
    	spyOn($scope, "refreshApplication");
    	var id = 1;
    	
    	// when
    	$scope.goToApplication(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshApplication).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/application'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.application = {id:'1', name:'application'};
    	
    	$scope.mode = 'create';
    	Application.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'applicationSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.application).toBe('applicationSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.application = {id:'1', name:'application'};
    	
    	$scope.mode = 'update';
    	Application.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'applicationSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.application).toBe('applicationSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Application.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToApplicationList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToApplicationList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : application create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/application/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.application).toBeNull();
    	expect($scope.applications).toBe('application1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});