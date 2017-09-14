var myApp = angular.module('myApp');

(function(app){
    'use strict';

    app.factory('userData', function($http,$log){
        return {

            getUsers : function (successCallBack)
            {
                $http.get("https://jsonplaceholder.typicode.com/users")
                .then(function (response) {
                    //success
                    successCallBack(response.data);
                },
                function (error) {
                    //failure
                    $log.warning( "Failed to load data " + error);
                }).finally(function () {
                });    
            }

        };
    })
})(myApp);