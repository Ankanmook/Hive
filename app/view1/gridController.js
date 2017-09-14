var myApp = angular.module('myApp');

(function(app){
    'use strict';
    app.controller("gridController", ['$scope', '$http', '$rootScope', '$timeout','$uibModal', 'postData','userData', 
    function($scope, $http, $rootScope, $timeout, $uibModal,postData, userData){
 
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
        userData.getUsers(function(users){
            $scope.users = users;
            $scope.user = $scope.users[0];
            $scope.userId = $scope.user.userId;
            $scope.currentUser = $scope.user;
        });
    }

    function _getPost(userId)
    {
        postData.getPosts(userId,function(posts){
            $scope.posts = posts;
        });
    }

    function _getComments()
    {
        $scope.post.comments = [];
        postData.getComments($scope.post,function(comments){
            $scope.post.comments = comments;
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

    }])
})(myApp);
