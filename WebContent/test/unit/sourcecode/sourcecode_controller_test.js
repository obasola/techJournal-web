'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('sourceCode.module'));
  
  describe('SourceCodeCtrl', function(){
    var SourceCodeCtrl, SourceCode, SourceType,  TechNote, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// SourceCode service
    	SourceCode = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'sourceCode1'});
    			return deferred.promise;
    		}
    	};
		
				SourceType = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				TechNote = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				SourceCodeCtrl = $controller('SourceCodeCtrl', {
    		'SourceCode': SourceCode,
						'SourceType': SourceType,
						'TechNote': TechNote,
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
    	expect($scope.sourceCode).toBeNull();
    	expect($scope.sourceCodes).toBe('sourceCode1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshSourceCodeList', function() {
    	// given
    	SourceCode.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'sourceCode2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSourceCodeList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.sourceCodes).toBe('sourceCode2');
    });
    
    it('refreshSourceCode', function() {
    	// given
    	SourceCode.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'sourceCode'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSourceCode('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.sourceCode).toBe('sourceCode'+'1');
    });
    
	it('goToSourceCodeList', function() {
    	// given
    	spyOn($scope, "refreshSourceCodeList");
    	
    	// when
    	$scope.goToSourceCodeList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSourceCodeList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/sourceCode');
    });
    
    it('goToSourceCode', function() {
    	// given
    	spyOn($scope, "refreshSourceCode");
    	var id = 1;
    	
    	// when
    	$scope.goToSourceCode(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSourceCode).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/sourceCode'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.sourceCode = {id:'1', name:'sourceCode'};
    	
    	$scope.mode = 'create';
    	SourceCode.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'sourceCodeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.sourceCode).toBe('sourceCodeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.sourceCode = {id:'1', name:'sourceCode'};
    	
    	$scope.mode = 'update';
    	SourceCode.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'sourceCodeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.sourceCode).toBe('sourceCodeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	SourceCode.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToSourceCodeList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToSourceCodeList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : sourceCode create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/sourceCode/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.sourceCode).toBeNull();
    	expect($scope.sourceCodes).toBe('sourceCode1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});