'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('batchJob.module'));
  
  describe('BatchJob', function(){
	var $httpBackend, BatchJob, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	BatchJob = $injector.get('BatchJob');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/batchJob').respond("test");
    	BatchJob.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/batchJob').respond("test");
    	BatchJob.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/batchJob/1').respond("test");
    	BatchJob.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		BatchJob.create({id:null,name:'batchJob'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('batchJob.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/batchJob').respond("test");
    	BatchJob.create({id:'1',name:'batchJob'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		BatchJob.update({id:null,name:'batchJob'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('batchJob.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/batchJob/1').respond("test");
    	BatchJob.update({id:'1',name:'batchJob'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/batchJob/1').respond("test");
    	BatchJob.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});