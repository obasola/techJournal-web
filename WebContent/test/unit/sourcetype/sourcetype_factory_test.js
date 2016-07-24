'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('sourceType.module'));
  
  describe('SourceType', function(){
	var $httpBackend, SourceType, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	SourceType = $injector.get('SourceType');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/sourceType').respond("test");
    	SourceType.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/sourceType').respond("test");
    	SourceType.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/sourceType/1').respond("test");
    	SourceType.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		SourceType.create({id:null,name:'sourceType'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('sourceType.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/sourceType').respond("test");
    	SourceType.create({id:'1',name:'sourceType'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		SourceType.update({id:null,name:'sourceType'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('sourceType.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/sourceType/1').respond("test");
    	SourceType.update({id:'1',name:'sourceType'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/sourceType/1').respond("test");
    	SourceType.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});