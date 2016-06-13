myApp.controller('FavoritesController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
    // This happens after view/controller loads -- not ideal
    console.log('checking user');
    $http.get('/user').then(function(response) {
        if (response.data.username) {
            $scope.userName = response.data.username;
            console.log('User Data: ', $scope.userName);
        } else {
            $location.path("/favorites");
        }
    });

    $scope.logout = function() {
        $http.get('/user/logout').then(function(response) {
            console.log('logged out');
            $location.path("/home");
        });
    }


$scope.userName = '';
// This happens after view/controller loads -- not ideal
console.log('checking user');
$http.get('/user').then(function(response) {
    if (response.data.username) {
        $scope.userName = response.data.username;
        console.log('User Data: ', $scope.userName);
        getFavorites();
    } else {
        $location.path("/favorites");
    }
});

$scope.currentContent = {};
$scope.favorite = [];
$scope.sortBy = '';

function getFavorites() {
    $http.get('/favorites/' + $scope.userName)
        .then(function(response) {
            $scope.favorite = response.data;
            console.log('got the faves, man!');
            console.log($scope.favorite);
        })

}
$scope.deleteFavorite = function(favoriteID) {
$http.delete('/favorites/' + favoriteID)
.then(function(response) {
    console.log("Deleted favorite");
    getFavorites();
});
};

$scope.login = function() {
  if($scope.user.username == '' || $scope.user.password == '') {
    $scope.message = "Enter your username and password!";
  } else {
    console.log('sending to server...', $scope.user);
    $http.post('/', $scope.user).then(function(response) {
      if(response.data.username) {
        console.log('success: ', response.data);
        // location works with SPA (ng-route)
        $location.path('/favorites');
      } else {
        console.log('failure: ', response);
        $scope.message = "Wrong!!";
      }
    });
  }
}



}]);
