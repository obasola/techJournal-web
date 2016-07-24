'use strict';

// Add "endsWith" function to the String object
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
   'ngRoute'
  ,'ngResource' 
  ,'ngMaterial'
  ,'ngCookies'
  ,'i18n'
  ,'pascalprecht.translate'
  ,'tmh.dynamicLocale'
  ,'mgcrea.ngStrap.tooltip'
  ,'mgcrea.ngStrap.datepicker'
  ,'myApp.filters'
  ,'myApp.services'
  ,'myApp.directives'
  ,'messageHandler.module'
  ,'sprint.module',
  'application.module', 
  'batchJob.module', 
  'releaseNote.module',
  'restCall.module', 
  'sourceCode.module', 
  'sourceType.module',
  'sqlScript.module', 
  'techNote.module', 
  'sprint.module'
]);

/**
 * Main configuration
 */
myApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'partials/welcome.html'
	});
	$routeProvider.when('/welcome', {
		templateUrl : 'partials/welcome.html'
	});
	$routeProvider.when('/sprint', {
		templateUrl : 'partials/sprint/sprint_list.html',
		controller : 'SprintCtrl'
	});
	$routeProvider.when('/notes', {
		templateUrl : 'partials/technote/technote_list.html',
		controller : 'TechNoteCtrl'
	});
	$routeProvider.when('/application', {
		templateUrl : 'partials/application/application_list.html',
		controller : 'ApplicationCtrl'
	});
	$routeProvider.when('/release', {
		templateUrl : 'partials/releasenote/releasenote_list.html',
		controller : 'ReleaseNoteCtrl'
	});
	$routeProvider.when('/jobs', {
		templateUrl : 'partials/batchjob/batchjob_list.html',
		controller : 'BatchJobCtrl'
	});
	$routeProvider.when('/restPage', {
		templateUrl : 'partials/restcall/restcall_list.html',
		controller : 'RestCallCtrl'
	});
	$routeProvider.when('/scripts', {
		templateUrl : 'partials/sqlscript/sqlscript_list.html',
		controller : 'SqlScriptCtrl'
	});
	$routeProvider.when('/sourceCode', {
		templateUrl : 'partials/sourcecode/sourcecode_list.html',
		controller : 'SourceCodeCtrl'
	});
	$routeProvider.when('/sourceTypes', {
		templateUrl : 'partials/sourcetype/sourcetype_list.html',
		controller : 'SourceTypeCtrl'
	});
	$routeProvider.otherwise({
		redirectTo : '/'
	});
} ]);
myApp.controller('AppController', [ '$location', '$scope',
		function($location, $scope) {
			$scope.showHomePage = function() {
				$location.path('/welcome');
			};
			$scope.showSprintsPage = function() {
				$location.path('/sprint');
			};
			$scope.showNotesPage = function() {
				$location.path('/notes');
			}
			$scope.showAppsPage = function() {
				$location.path('/application');
			};
			$scope.showReleasePage = function() {
				$location.path('/release');
			};
			$scope.showJobsPage = function() {
				$location.path('/jobs');
			};
			$scope.showRestPage = function() {
				$location.path('/restPage');
			};
			$scope.showScriptsPage = function() {
				$location.path('/scripts');
			};
			$scope.showSourcesPage = function() {
				$location.path('/sourceCode');
			};
			$scope.showTypesPage = function() {
				$location.path('/sourceTypes');
			};
		} ]);

