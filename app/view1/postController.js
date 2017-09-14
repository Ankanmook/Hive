var myApp = angular.module('myApp');

(function(app){
    'use strict';
    app.controller("postController", ['$scope', '$http', '$rootScope', '$uibModalInstance', 'postData', 'userData',
    function($scope, $http, $rootScope, $uibModalInstance,postData, userData){

    $scope.users = [];       
    $scope.currentUser;

    $scope.postDataObject = {};
    
    _getUser();
    
    function _getUser()
    {
        userData.getUsers(function(users){
            $scope.users = users;
        });
    }
    
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
        
        $scope.postDataObject.body = $scope.postBody;
        $scope.postDataObject.title = $scope.postTitle;
        $scope.postDataObject.userId = $scope.currentUser.id;

        postData.post($scope.postDataObject,function(response){

            console.log(response);
            if(response.status == 201)
            {
                $scope.childmethod(response.data);
                $uibModalInstance.dismiss('done');
            }
        });
        // $http.post("https://jsonplaceholder.typicode.com/posts",$scope.postData)
        // .then(function (response) {
        //     //success
        //     if(response.status == 201)
        //     {
        //         $scope.childmethod(response.data);
        //         $uibModalInstance.dismiss('done');
        //     }
        // },
        //    function (error) {
        //        //failure
        //        $scope.errorMessage = "Failed to load data " + error;
        //        $scope.done = false;
        //    }).finally(function () {                   
        //        $scope.isBusy = false;                   
        //    });
    }

    }])

})(myApp);