'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('sprint.module'));
  
  describe('SprintCtrl', function(){
    var SprintCtrl, Sprint, Application, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Sprint service
    	Sprint = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'sprint1'});
    			return deferred.promise;
    		}
    	};
		
				Application = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				SprintCtrl = $controller('SprintCtrl', {
    		'Sprint': Sprint,
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
    	expect($scope.sprint).toBeNull();
    	expect($scope.sprints).toBe('sprint1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshSprintList', function() {
    	// given
    	Sprint.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'sprint2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSprintList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.sprints).toBe('sprint2');
    });
    
    it('refreshSprint', function() {
    	// given
    	Sprint.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'sprint'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSprint('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.sprint).toBe('sprint'+'1');
    });
    
	it('goToSprintList', function() {
    	// given
    	spyOn($scope, "refreshSprintList");
    	
    	// when
    	$scope.goToSprintList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSprintList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/sprint');
    });
    
    it('goToSprint', function() {
    	// given
    	spyOn($scope, "refreshSprint");
    	var id = 1;
    	
    	// when
    	$scope.goToSprint(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSprint).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/sprint'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.sprint = {id:'1', name:'sprint'};
    	
    	$scope.mode = 'create';
    	Sprint.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'sprintSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.sprint).toBe('sprintSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.sprint = {id:'1', name:'sprint'};
    	
    	$scope.mode = 'update';
    	Sprint.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'sprintSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.sprint).toBe('sprintSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Sprint.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToSprintList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToSprintList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : sprint create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/sprint/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.sprint).toBeNull();
    	expect($scope.sprints).toBe('sprint1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});