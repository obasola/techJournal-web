'use strict';

/* Module for SourceType */

var sourceTypeModule = angular.module('sourceType.module', ['myApp']);

/**
 * Module for sourceType
 */
sourceTypeModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/sourceType',    {templateUrl: 'partials/sourcetype/sourcetype_list.html', controller: 'SourceTypeCtrl'});
    $routeProvider.when('/sourceType/new', {templateUrl: 'partials/sourcetype/sourcetype_form.html', controller: 'SourceTypeCtrl'});
    $routeProvider.when('/sourceType/:id', {templateUrl: 'partials/sourcetype/sourcetype_form.html', controller: 'SourceTypeCtrl'});
}]);
