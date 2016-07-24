'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('releaseNote.module'));
  
  describe('ReleaseNote', function(){
	var $httpBackend, ReleaseNote, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	ReleaseNote = $injector.get('ReleaseNote');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/releaseNote').respond("test");
    	ReleaseNote.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/releaseNote').respond("test");
    	ReleaseNote.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/releaseNote/1').respond("test");
    	ReleaseNote.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		ReleaseNote.create({id:null,name:'releaseNote'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('releaseNote.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/releaseNote').respond("test");
    	ReleaseNote.create({id:'1',name:'releaseNote'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		ReleaseNote.update({id:null,name:'releaseNote'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('releaseNote.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/releaseNote/1').respond("test");
    	ReleaseNote.update({id:'1',name:'releaseNote'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/releaseNote/1').respond("test");
    	ReleaseNote.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});