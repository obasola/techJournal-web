'use strict';

/* Module for SourceCode */

var sourceCodeModule = angular.module('sourceCode.module', ['myApp']);

/**
 * Module for sourceCode
 */
sourceCodeModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/sourceCode',    {templateUrl: 'partials/sourcecode/sourcecode_list.html', controller: 'SourceCodeCtrl'});
    $routeProvider.when('/sourceCode/new', {templateUrl: 'partials/sourcecode/sourcecode_form.html', controller: 'SourceCodeCtrl'});
    $routeProvider.when('/sourceCode/:id', {templateUrl: 'partials/sourcecode/sourcecode_form.html', controller: 'SourceCodeCtrl'});
}]);
