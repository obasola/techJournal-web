'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('releaseNote.module'));
  
  describe('ReleaseNoteCtrl', function(){
    var ReleaseNoteCtrl, ReleaseNote, TechNote, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// ReleaseNote service
    	ReleaseNote = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'releaseNote1'});
    			return deferred.promise;
    		}
    	};
		
				TechNote = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				ReleaseNoteCtrl = $controller('ReleaseNoteCtrl', {
    		'ReleaseNote': ReleaseNote,
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
    	expect($scope.releaseNote).toBeNull();
    	expect($scope.releaseNotes).toBe('releaseNote1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshReleaseNoteList', function() {
    	// given
    	ReleaseNote.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'releaseNote2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshReleaseNoteList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.releaseNotes).toBe('releaseNote2');
    });
    
    it('refreshReleaseNote', function() {
    	// given
    	ReleaseNote.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'releaseNote'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshReleaseNote('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.releaseNote).toBe('releaseNote'+'1');
    });
    
	it('goToReleaseNoteList', function() {
    	// given
    	spyOn($scope, "refreshReleaseNoteList");
    	
    	// when
    	$scope.goToReleaseNoteList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshReleaseNoteList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/releaseNote');
    });
    
    it('goToReleaseNote', function() {
    	// given
    	spyOn($scope, "refreshReleaseNote");
    	var id = 1;
    	
    	// when
    	$scope.goToReleaseNote(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshReleaseNote).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/releaseNote'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.releaseNote = {id:'1', name:'releaseNote'};
    	
    	$scope.mode = 'create';
    	ReleaseNote.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'releaseNoteSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.releaseNote).toBe('releaseNoteSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.releaseNote = {id:'1', name:'releaseNote'};
    	
    	$scope.mode = 'update';
    	ReleaseNote.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'releaseNoteSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.releaseNote).toBe('releaseNoteSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	ReleaseNote.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToReleaseNoteList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToReleaseNoteList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : releaseNote create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/releaseNote/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.releaseNote).toBeNull();
    	expect($scope.releaseNotes).toBe('releaseNote1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});