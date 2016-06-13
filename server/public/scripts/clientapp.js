var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/mix', {
      templateUrl: '/views/mix.html',
      controller: "MixController"
    })
    .when('/search', {
      templateUrl: '/views/search.html',
      controller: "SearchController"
    })
    .when('/login', {
      templateUrl: '/views/login.html',
      controller: "LoginController"
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController"
    })
    .when('/favorites', {
      templateUrl: '/views/favorites.html',
      controller: "FavoritesController"
    })
    .otherwise({
    redirectTo: 'mix'
});

}]);
