'use strict';

/* Module for SqlScript */

var sqlScriptModule = angular.module('sqlScript.module', ['myApp']);

/**
 * Module for sqlScript
 */
sqlScriptModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/sqlScript',    {templateUrl: 'partials/sqlscript/sqlscript_list.html', controller: 'SqlScriptCtrl'});
    $routeProvider.when('/sqlScript/new', {templateUrl: 'partials/sqlscript/sqlscript_form.html', controller: 'SqlScriptCtrl'});
    $routeProvider.when('/sqlScript/:id', {templateUrl: 'partials/sqlscript/sqlscript_form.html', controller: 'SqlScriptCtrl'});
}]);
