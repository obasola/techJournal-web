'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('techNote.module'));
  
  describe('TechNoteCtrl', function(){
    var TechNoteCtrl, TechNote, Sprint,  Application, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// TechNote service
    	TechNote = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'techNote1'});
    			return deferred.promise;
    		}
    	};
		
				Sprint = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Application = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				TechNoteCtrl = $controller('TechNoteCtrl', {
    		'TechNote': TechNote,
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
    	expect($scope.techNote).toBeNull();
    	expect($scope.techNotes).toBe('techNote1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshTechNoteList', function() {
    	// given
    	TechNote.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'techNote2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTechNoteList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.techNotes).toBe('techNote2');
    });
    
    it('refreshTechNote', function() {
    	// given
    	TechNote.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'techNote'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTechNote('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.techNote).toBe('techNote'+'1');
    });
    
	it('goToTechNoteList', function() {
    	// given
    	spyOn($scope, "refreshTechNoteList");
    	
    	// when
    	$scope.goToTechNoteList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTechNoteList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/techNote');
    });
    
    it('goToTechNote', function() {
    	// given
    	spyOn($scope, "refreshTechNote");
    	var id = 1;
    	
    	// when
    	$scope.goToTechNote(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTechNote).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/techNote'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.techNote = {id:'1', name:'techNote'};
    	
    	$scope.mode = 'create';
    	TechNote.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'techNoteSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.techNote).toBe('techNoteSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.techNote = {id:'1', name:'techNote'};
    	
    	$scope.mode = 'update';
    	TechNote.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'techNoteSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.techNote).toBe('techNoteSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	TechNote.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToTechNoteList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToTechNoteList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : techNote create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/techNote/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.techNote).toBeNull();
    	expect($scope.techNotes).toBe('techNote1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});