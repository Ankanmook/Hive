var myApp = angular.module('myApp');

(function(app){
    'use strict';
    app.controller("postController", ['$scope', '$http', '$rootScope', '$uibModalInstance', 
    function($scope, $http, $rootScope, $uibModalInstance){

    $scope.users = [];       
    $scope.currentUser;

    $scope.postData = {};
    
    $http.get("https://jsonplaceholder.typicode.com/users")
    .then(function (response) {
        //success
        angular.copy(response.data, $scope.users);
    },
    function (error) {
        //failure
        console.log( "Failed to load data " + error);
    }).finally(function () {
    }); 

    $scope.updateUser = function(){        
        angular.forEach($scope.users, function(el){           
            if(el.id == $scope.userId)
                {                                       
                    $scope.currentUser = el;            
                }

        }); 
    };

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.doneModal = function () {
        //Post New Post
        _postNewPost();
    };

    $scope.childmethod = function (postData) {
        $rootScope.$emit("CallParentMethod", postData);
    };

    function _postNewPost() {
        
        $scope.postData.body = $scope.postBody;
        $scope.postData.title = $scope.postTitle;
        $scope.postData.userId = $scope.currentUser.id;

        $http.post("https://jsonplaceholder.typicode.com/posts",$scope.postData)
        .then(function (response) {
            //success
            if(response.status == 201)
            {
                $scope.childmethod(response.data);
                $uibModalInstance.dismiss('done');
            }
        },
           function (error) {
               //failure
               $scope.errorMessage = "Failed to load data " + error;
               $scope.done = false;
           }).finally(function () {                   
               $scope.isBusy = false;                   
           });
    }

    }])

})(myApp);