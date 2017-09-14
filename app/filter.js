var myApp = angular.module('myApp');

'use strict';
(function(app){

    app.filter('orderObjectBy', function () {
        
    return function(input, attribute) {

    var ascending = false;            
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
    array.push(input[objectKey]);
    }

    array.sort(function(a, b){
    a = parseInt(a[attribute]);
    b = parseInt(b[attribute]);
    if(ascending === true)
        {
            return a - b;
        }else{
            return b - a;
        }
    });
    return array;
    }
    });
})(myApp);
