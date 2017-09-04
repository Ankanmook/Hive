var myApp = angular.module('myApp');

(function(app){
    'use strict';
    app.controller("gridController", ['$scope', '$http', 
    function($scope, $http){


    $scope.posts = [];
    $scope.comments = [];

    $scope.albums = [];
    $scope.photos = [];

    $scope.todos = [];
    $scope.users = [];

    $scope.user;
    $scope.currentUser;

    $scope.userId;

    $http.get("https://jsonplaceholder.typicode.com/users")
    .then(function (response) {
        //success
        angular.copy(response.data, $scope.users); //copy data from reponse data to data
        
        $scope.user = $scope.users[0];
        $scope.userId = $scope.user.userId;
        console.log($scope.data);
        $scope.currentUser = $scope.user;
    },
    function (error) {
        //failure
        console.log( "Failed to load data " + error);
    }).finally(function () {
    });

    function _getPost(userId)
    {
        $http.get("https://jsonplaceholder.typicode.com/posts?userId="+userId)
        .then(function (response) {
            //success
            angular.copy(response.data, $scope.posts); //copy data from reponse data to data
            console.log($scope.data);
        },
        function (error) {
            //failure
            console.log( "Failed to load data " + error);
        }).finally(function () {
        });    
    }


    $scope.updateUser = function(){
        
        console.log( $scope.userId);
        
        angular.forEach($scope.users, function(el){           
            if(el.id == $scope.userId)
                {                    
                    console.log(el);                    
                    _getPost(el.id);
                    $scope.currentUser = el;
                    // $scope.currentUserId = el.id;
                    // $scope.currentUserName = el.name;
                    // $scope.currentUserEmail = el.email;        
                    // $scope.currentUserAddress = $scope.user.address.street + " " + $scope.user.address.suite + " " +  $scope.user.address.city + " " +  $scope.user.address.zipcode;
                    // $scope.currentUserPhone = el.phone;
                    // $scope.currentUserWebsite = el.website
                    // $scope.currentUserCompany = $scope.user.company.name + " " + $scope.user.company.catchPhrase + " " + $scope.user.company.bs;
            
                }

        }); 
    };


    }]);
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
