'use strict';

/* Module for Sprint */

var sprintModule = angular.module('sprint.module', ['myApp']);

/**
 * Module for sprint
 */
sprintModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/sprint',    {templateUrl: 'partials/sprint/sprint_list.html', controller: 'SprintCtrl'});
    $routeProvider.when('/sprint/new', {templateUrl: 'partials/sprint/sprint_form.html', controller: 'SprintCtrl'});
    $routeProvider.when('/sprint/:id', {templateUrl: 'partials/sprint/sprint_form.html', controller: 'SprintCtrl'});
}]);
