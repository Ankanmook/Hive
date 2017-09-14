var myApp = angular.module('myApp');

(function(app){
    'use strict';

    app.factory('postData', function($http,$log){
        return {

            getPosts : function (userId, successCallBack)
            {
                $http.get("https://jsonplaceholder.typicode.com/posts?userId="+userId)
                .then(function (response) {
                    //success                    
                    successCallBack(response.data);
                },
                function (error) {
                    //failure
                    $log.warning( "Failed to load data " + error);
                }).finally(function () {
                });    
            }

            ,
            getComments: function(post, successCallBack)
            {
                $http.get("https://jsonplaceholder.typicode.com/comments?postId="+ post.id)
                .then(function (response) {
                    //success
                    angular.forEach(response.data, function(el){
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
                    successCallBack(response.data);
                },
                function (error) {
                    //failure
                    $log.warning( "Failed to load data " + error);
                }).finally(function () {
                });            
        
            } 
        
        };
    })
})(myApp);