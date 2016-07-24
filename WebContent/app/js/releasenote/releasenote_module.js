'use strict';

/* Module for ReleaseNote */

var releaseNoteModule = angular.module('releaseNote.module', ['myApp']);

/**
 * Module for releaseNote
 */
releaseNoteModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/releaseNote',    {templateUrl: 'partials/releasenote/releasenote_list.html', controller: 'ReleaseNoteCtrl'});
    $routeProvider.when('/releaseNote/new', {templateUrl: 'partials/releasenote/releasenote_form.html', controller: 'ReleaseNoteCtrl'});
    $routeProvider.when('/releaseNote/:id', {templateUrl: 'partials/releasenote/releasenote_form.html', controller: 'ReleaseNoteCtrl'});
}]);
