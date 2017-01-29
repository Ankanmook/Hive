'use strict';

// Declare app level module which depends on views, and components
var theApp = angular.module('myApp', [
  'ngRoute',
  //'myApp.view1',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider
    .when('/view1', {
      templateUrl: 'view1/view1.html'
    })
    .otherwise({redirectTo: '/view1'});
}]);
