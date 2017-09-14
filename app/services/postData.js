var myApp = angular.module('myApp');

(function(app){
    'use strict';

    app.factory('postData', function(){
        return {
            post: {
                name: 'Ankan'
            }
        };
    })
})(myApp);