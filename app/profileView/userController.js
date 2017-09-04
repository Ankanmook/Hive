var myApp = angular.module('myApp');

(function(app){
    'use strict';
    app.controller("userController", ['$routeParams','$scope', '$http', 
    function($routeParams, $scope, $http){

    console.log($routeParams.id)

    $scope.posts = [];
    $scope.comments = [];

    $scope.albums = [];
    $scope.photos = [];

    $scope.todos = [];
    $scope.users = [];

    $scope.user;
    $scope.currentUser;

    $scope.userId;

    $scope.orderByFilter = [{name:"Ascending", value:true},{name:"Descending", value:false}];
    $scope.currentOrderByFilter = true;

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
            console.log($scope.posts);
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
                    _getPost(el.id);
                    $scope.currentUser = el;            
                }

        }); 
    };

      var increment = 0;
      $scope.reverse = true;
      $scope.orderParam = '';

      $scope.toggleOrder = function(){
        increment++;
        console.log(increment);
        switch (increment) {            
            case 1:
              $scope.orderParam = 'id';
              $scope.reverse = !$scope.reverse;
              break;
            case 2:
              $scope.orderParam = '';
              increment = 0;
              break;
          }   
          console.log($scope.orderParam);
          console.log($scope.reverse);
      };

    }]).filter('orderObjectBy', function () {
                       
        return function(input, attribute) {
            
            var ascending = false;
            console.log(ascending);
            
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
