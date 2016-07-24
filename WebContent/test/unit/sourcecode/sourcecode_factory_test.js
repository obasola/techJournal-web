'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('sourceCode.module'));
  
  describe('SourceCode', function(){
	var $httpBackend, SourceCode, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	SourceCode = $injector.get('SourceCode');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/sourceCode').respond("test");
    	SourceCode.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/sourceCode').respond("test");
    	SourceCode.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/sourceCode/1').respond("test");
    	SourceCode.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		SourceCode.create({id:null,name:'sourceCode'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('sourceCode.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/sourceCode').respond("test");
    	SourceCode.create({id:'1',name:'sourceCode'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		SourceCode.update({id:null,name:'sourceCode'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('sourceCode.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/sourceCode/1').respond("test");
    	SourceCode.update({id:'1',name:'sourceCode'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/sourceCode/1').respond("test");
    	SourceCode.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});