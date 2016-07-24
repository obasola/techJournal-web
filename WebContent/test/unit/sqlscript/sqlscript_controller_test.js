'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('sqlScript.module'));
  
  describe('SqlScriptCtrl', function(){
    var SqlScriptCtrl, SqlScript, ReleaseNote, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// SqlScript service
    	SqlScript = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'sqlScript1'});
    			return deferred.promise;
    		}
    	};
		
				ReleaseNote = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				SqlScriptCtrl = $controller('SqlScriptCtrl', {
    		'SqlScript': SqlScript,
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
    	expect($scope.sqlScript).toBeNull();
    	expect($scope.sqlScripts).toBe('sqlScript1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshSqlScriptList', function() {
    	// given
    	SqlScript.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'sqlScript2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSqlScriptList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.sqlScripts).toBe('sqlScript2');
    });
    
    it('refreshSqlScript', function() {
    	// given
    	SqlScript.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'sqlScript'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSqlScript('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.sqlScript).toBe('sqlScript'+'1');
    });
    
	it('goToSqlScriptList', function() {
    	// given
    	spyOn($scope, "refreshSqlScriptList");
    	
    	// when
    	$scope.goToSqlScriptList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSqlScriptList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/sqlScript');
    });
    
    it('goToSqlScript', function() {
    	// given
    	spyOn($scope, "refreshSqlScript");
    	var id = 1;
    	
    	// when
    	$scope.goToSqlScript(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSqlScript).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/sqlScript'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.sqlScript = {id:'1', name:'sqlScript'};
    	
    	$scope.mode = 'create';
    	SqlScript.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'sqlScriptSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.sqlScript).toBe('sqlScriptSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.sqlScript = {id:'1', name:'sqlScript'};
    	
    	$scope.mode = 'update';
    	SqlScript.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'sqlScriptSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.sqlScript).toBe('sqlScriptSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	SqlScript.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToSqlScriptList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToSqlScriptList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : sqlScript create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/sqlScript/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.sqlScript).toBeNull();
    	expect($scope.sqlScripts).toBe('sqlScript1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});