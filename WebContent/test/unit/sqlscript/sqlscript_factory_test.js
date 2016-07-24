'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('sqlScript.module'));
  
  describe('SqlScript', function(){
	var $httpBackend, SqlScript, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	SqlScript = $injector.get('SqlScript');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/sqlScript').respond("test");
    	SqlScript.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/sqlScript').respond("test");
    	SqlScript.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/sqlScript/1').respond("test");
    	SqlScript.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		SqlScript.create({id:null,name:'sqlScript'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('sqlScript.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/sqlScript').respond("test");
    	SqlScript.create({id:'1',name:'sqlScript'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		SqlScript.update({id:null,name:'sqlScript'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('sqlScript.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/sqlScript/1').respond("test");
    	SqlScript.update({id:'1',name:'sqlScript'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/sqlScript/1').respond("test");
    	SqlScript.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});