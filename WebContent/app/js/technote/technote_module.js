'use strict';

/* Module for TechNote */

var techNoteModule = angular.module('techNote.module', ['myApp']);

/**
 * Module for techNote
 */
techNoteModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/techNote',    {templateUrl: 'partials/technote/technote_list.html', controller: 'TechNoteCtrl'});
    $routeProvider.when('/techNote/new', {templateUrl: 'partials/technote/technote_form.html', controller: 'TechNoteCtrl'});
    $routeProvider.when('/techNote/:id', {templateUrl: 'partials/technote/technote_form.html', controller: 'TechNoteCtrl'});
}]);
