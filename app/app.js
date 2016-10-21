'use strict';

// Declare app level module which depends on views, and components
angular.module('AngularWebApp', [
  'ngRoute',
    'AngularWebApp.home',
  'AngularWebApp.register',
    'AngularWebApp.welcome',
    'AngularWebApp.addPost'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {


  $routeProvider.otherwise({redirectTo: '/home'});
}]);
