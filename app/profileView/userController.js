var myApp = angular.module('myApp');

(function(app){
    'use strict';
    app.controller("userController", ['$routeParams','$scope', '$http', 'userData',
    function($routeParams, $scope, $http, userData){

    $scope.currentUser;
    _getUser();

    function _getUser(){
        userData.getUsers(function(users){
            angular.forEach(users, function(el){                   
                if(el.id == $routeParams.id){
                        $scope.currentUser = el;
                }
            });
        });
    }    
    
    }])

})(myApp);
