var myApp = angular.module('myApp');

(function(app){
    'use strict';

    app.factory('userData', function(){
        return {
            user: {
                name: 'Ankan'
            }
        };
    })
})(myApp);