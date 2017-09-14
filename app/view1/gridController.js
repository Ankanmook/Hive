var myApp = angular.module('myApp');

(function(app){
    'use strict';
    app.controller("gridController", ['$scope', '$http', '$rootScope', '$timeout','$uibModal', 'postData', 
    function($scope, $http, $rootScope, $timeout, $uibModal,postData){
 
        console.log(postData);

    $scope.post ;

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

    _getUser();

    function _getUser()
    {
        $http.get("https://jsonplaceholder.typicode.com/users")
        .then(function (response) {
            //success
            angular.copy(response.data, $scope.users); //copy data from reponse data to data       
            $scope.user = $scope.users[0];
            $scope.userId = $scope.user.userId;
            //$scope.currentUser = $scope.user;
        },
        function (error) {
            //failure
            console.log( "Failed to load data " + error);
        }).finally(function () {
        });
    }


    function _getPost(userId)
    {
        $http.get("https://jsonplaceholder.typicode.com/posts?userId="+userId)
        .then(function (response) {
            //success
            angular.copy(response.data, $scope.posts); //copy data from reponse data to data
        },
        function (error) {
            //failure
            console.log( "Failed to load data " + error);
        }).finally(function () {
        });    
    }

    function _getComments()
    {
        $scope.post.comments = [];
        
        $http.get("https://jsonplaceholder.typicode.com/comments?postId="+ $scope.post.id)
        .then(function (response) {
            //success
            angular.copy(response.data, $scope.post.comments); //copy data from reponse data to data            
            angular.forEach($scope.post.comments, function(el){
                var index = el.id % 8;
                switch (index) {            
                    case 1:
                        el.color = 'yellowItem';
                        break;
                    case 2:
                        el.color = 'blueItem';
                        break;
                    case 3:
                        el.color = 'redItem';
                        break;
                    case 4:
                        el.color = 'brownItem';
                        break;
                    case 5:
                        el.color = 'purpleItem';
                        break;
                    case 6:
                        el.color = 'whiteItem';
                        break;
                    case 7:
                        el.color = 'greenItem';
                        break;
                    case 8:
                        el.color = 'pinkItem';
                        break;
                  }                
            });
        },
        function (error) {
            //failure
            console.log( "Failed to load data " + error);
        }).finally(function () {
        });            
    }


    $scope.updateUser = function(){        
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
      };

      $scope.collapsed = false;
      $scope.ToggleMoreLessButton = "More"; 

      $scope.getComments = function(post)
      {
        this.collapsed = !this.collapsed;
        if (this.ToggleMoreLessButton === "More") {
            this.ToggleMoreLessButton = "Less";
           
            $scope.post = post;
            _getComments();
        }else{
            this.ToggleMoreLessButton = "More"; 
        }
      };

      $scope.deletePost = function(post)
      {
        var index = $scope.posts.indexOf(post);
        $scope.posts.splice(index, 1);
      };

      $rootScope.$on("CallParentMethod", function (event,postData) {        
        $scope.posts.push(postData);
    });

      $scope.postNew = function()
      { 
        $timeout(function(){
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/view1/post.html',
                controller: 'postController'
            });            
          }, 3); 
      };

    }]).filter('orderObjectBy', function () {
                       
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
