'use strict';

/* Module for BatchJob */

var batchJobModule = angular.module('batchJob.module', ['myApp']);

/**
 * Module for batchJob
 */
batchJobModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/batchJob',    {templateUrl: 'partials/batchjob/batchjob_list.html', controller: 'BatchJobCtrl'});
    $routeProvider.when('/batchJob/new', {templateUrl: 'partials/batchjob/batchjob_form.html', controller: 'BatchJobCtrl'});
    $routeProvider.when('/batchJob/:id', {templateUrl: 'partials/batchjob/batchjob_form.html', controller: 'BatchJobCtrl'});
}]);
