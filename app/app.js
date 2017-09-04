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
      controller: "gridController",
      controllerAs: "grid",
      templateUrl: 'view1/view1.html'
    })
    .when('/users/:id', {
      controller: "userController",
      controllerAs: "user",
      templateUrl: 'profileView/user.html'
    })
    .otherwise({redirectTo: '/view1'});
}]);
