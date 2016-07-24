'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('sourceType.module'));
  
  describe('SourceTypeCtrl', function(){
    var SourceTypeCtrl, SourceType,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// SourceType service
    	SourceType = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'sourceType1'});
    			return deferred.promise;
    		}
    	};
		
				SourceTypeCtrl = $controller('SourceTypeCtrl', {
    		'SourceType': SourceType,
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
    	expect($scope.sourceType).toBeNull();
    	expect($scope.sourceTypes).toBe('sourceType1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshSourceTypeList', function() {
    	// given
    	SourceType.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'sourceType2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSourceTypeList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.sourceTypes).toBe('sourceType2');
    });
    
    it('refreshSourceType', function() {
    	// given
    	SourceType.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'sourceType'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSourceType('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.sourceType).toBe('sourceType'+'1');
    });
    
	it('goToSourceTypeList', function() {
    	// given
    	spyOn($scope, "refreshSourceTypeList");
    	
    	// when
    	$scope.goToSourceTypeList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSourceTypeList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/sourceType');
    });
    
    it('goToSourceType', function() {
    	// given
    	spyOn($scope, "refreshSourceType");
    	var id = 1;
    	
    	// when
    	$scope.goToSourceType(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSourceType).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/sourceType'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.sourceType = {id:'1', name:'sourceType'};
    	
    	$scope.mode = 'create';
    	SourceType.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'sourceTypeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.sourceType).toBe('sourceTypeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.sourceType = {id:'1', name:'sourceType'};
    	
    	$scope.mode = 'update';
    	SourceType.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'sourceTypeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.sourceType).toBe('sourceTypeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	SourceType.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToSourceTypeList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToSourceTypeList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : sourceType create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/sourceType/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.sourceType).toBeNull();
    	expect($scope.sourceTypes).toBe('sourceType1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});