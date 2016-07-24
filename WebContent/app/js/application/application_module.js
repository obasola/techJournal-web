'use strict';

/* Module for Application */

var applicationModule = angular.module('application.module', ['myApp']);

/**
 * Module for application
 */
applicationModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/application',    {templateUrl: 'partials/application/application_list.html', controller: 'ApplicationCtrl'});
    $routeProvider.when('/application/new', {templateUrl: 'partials/application/application_form.html', controller: 'ApplicationCtrl'});
    $routeProvider.when('/application/:id', {templateUrl: 'partials/application/application_form.html', controller: 'ApplicationCtrl'});
}]);
