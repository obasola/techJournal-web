'use strict';

/* Module for RestCall */

var restCallModule = angular.module('restCall.module', ['myApp']);

/**
 * Module for restCall
 */
restCallModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/restCall',    {templateUrl: 'partials/restcall/restcall_list.html', controller: 'RestCallCtrl'});
    $routeProvider.when('/restCall/new', {templateUrl: 'partials/restcall/restcall_form.html', controller: 'RestCallCtrl'});
    $routeProvider.when('/restCall/:id', {templateUrl: 'partials/restcall/restcall_form.html', controller: 'RestCallCtrl'});
}]);
