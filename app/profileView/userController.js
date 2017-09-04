var myApp = angular.module('myApp');

(function(app){
    'use strict';
    app.controller("userController", ['$routeParams','$scope', '$http', 
    function($routeParams, $scope, $http){

    $scope.currentUser;
    $http.get("https://jsonplaceholder.typicode.com/users")
    .then(function (response) {
        //success
        angular.forEach(response.data, function(el){                   
            if(el.id == $routeParams.id){
                    $scope.currentUser = el;
            }
        });
    },
    function (error) {
        //failure
        console.log( "Failed to load data " + error);
    }).finally(function () {
    }); 
    }])

})(myApp);

//Write the javascript here!

// var itemList = [
//   { IsSpecial: true, Name: "item 1", ItemType: "category1"},
// { IsSpecial: false, Name: "item 2", ItemType: "category1"},
// { IsSpecial: false, Name: "item 3", ItemType: "category2"},
// { IsSpecial: false, Name: "item 4", ItemType: "category3"},
// { IsSpecial: true, Name: "item 5", ItemType: "category2"},
// { IsSpecial: true, Name: "item 6", ItemType: "category1"},
// { IsSpecial: false, Name: "item 7", ItemType: "category1"},
// { IsSpecial: false, Name: "item 8", ItemType: "category2"},
// { IsSpecial: false, Name: "item 9", ItemType: "category3"},
// { IsSpecial: true, Name: "item 10", ItemType: "category3"},
// { IsSpecial: true, Name: "item 11", ItemType: "category2"},
// { IsSpecial: false, Name: "item 12", ItemType: "category1"},
// { IsSpecial: false, Name: "item 13", ItemType: "category2"},
// { IsSpecial: false, Name: "item 14", ItemType: "category3"},
// { IsSpecial: true, Name: "item 15", ItemType: "category2"}
// ];
