'use strict';

angular.module('AngularWebApp.home', ['ngRoute', 'firebase'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', ['$scope', '$firebaseAuth', '$location', 'CommonProp', function ($scope, $firebaseAuth, $location, CommonProp) {

       $scope.username = CommonProp.getUser();
        if($scope.username){
            $location.path('/welcome');
        }
        $scope.signIn = function () {
            var username = $scope.user.email;
            var password = $scope.user.password;
            var auth = $firebaseAuth();
            //login in with fire base
            auth.$signInWithEmailAndPassword(username, password).then(function () {
                console.log("user login Successful");
                CommonProp.setUser($scope.user.email);

                $location.path('/welcome');
                $scope.errMsg = false;
            }).catch(function (error) {
                console.log(error);
                $scope.errMsg = true;
                $scope.errorMessage = error.message;
            });
        }
    }])

    .service('CommonProp', ['$location', '$firebaseAuth', function ($location, $firebaseAuth) {
        var user = "";
        var auth = $firebaseAuth();
        return {
            getUser: function () {
               if(user == ""){
                  user= localStorage.getItem("userEmail");
               }
                return user;
            },
            setUser: function (value) {
                localStorage.setItem("userEmail", value);
                user = value;
            },
            logoutUser: function(){
                auth.$signOut();
                    console.log("Loggeed Out Successfully");
                    user = "";
                    localStorage.removeItem('userEmail');
                    $location.path('/home');

            }
        };
    }]);