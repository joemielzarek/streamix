myApp.controller('SearchController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

    $scope.show = [];
    $scope.movie = [];
    var currentContent = {};

    //- - - - - - - Search Guide Box API Functionality - - - - - - -  //
    $scope.searchShow = function() {
        $scope.showResults = true;
        $http.get('https://api-public.guidebox.com/v1.43/US/rK4sScT4OGdI8lVl' +
                'wAkOzOI5DWLeHqUp/search/title/' + encodeURIComponent($scope.showInput) + '/fuzzy')
            .then(function(response) {
                $scope.show = response.data.results;
                if ($scope.show === undefined) {
                    alert("No results found.");
                }
                console.log($scope.show);
                console.log(encodeURIComponent($scope.showInput));
                $scope.loading = false;
                $scope.top = true;
                $scope.toptoo = false;


            });
            $scope.loading = true;

    };

    $scope.searchMovie = function() {
        $scope.movieResults = true;
        $http.get('https://api-public.guidebox.com/v1.43/US/rK4sScT4OGdI8lVl' +
                'wAkOzOI5DWLeHqUp/search/movie/title/' + encodeURIComponent($scope.movieInput) + '/fuzzy')
            .then(function(response) {
                $scope.movie = response.data.results;
                if ($scope.movie === undefined) {
                    alert("No results found.");
                }
                console.log($scope.movie);
                console.log(encodeURIComponent($scope.movieInput));
                $scope.loading = false;
                $scope.toptoo = true;
                $scope.top = false;


            });
            $scope.loading = true;

    };

    //- - - - - - - Must Watch Favorite Functionality - - - - - - -  //
    $scope.addFavoriteShow = function(results) {
      console.log(results);
        currentContent.contentID = results.id;
        currentContent.title = results.title;
        currentContent.image = results.artwork_208x117;
        currentContent.watchLink = results.tvrage.link;
        currentContent.learnLink = results.wikipedia_id;
        currentContent.user = $scope.userName;

        console.log(currentContent);


        $http.post('/favorites', currentContent)
            .then(function() {
                console.log('POST /favorites');
            });
    };

    $scope.addFavoriteMovie = function(results) {
        var watchID = 'http://www.guidebox.com/choose_source_movie.php?movie_id=';
        var tomatoesID = 'http://www.rottentomatoes.com/m/';
        currentContent.title = results.original_title;
        currentContent.rating = results.rating;
        currentContent.releaseYear = results.release_year;
        currentContent.image = results.poster_120x171;
        currentContent.watchLink = watchID + results.id;
        currentContent.learnLink = results.wikipedia_id;
        currentContent.tomates = tomatoesID + results.rottentomatoes;
        currentContent.user = $scope.userName;

        console.log(currentContent);

        $http.post('/favorites', currentContent)
            .then(function() {
                console.log('POST /favorites');
            });
    };



    //- - - - - - - User Authentication Functionality - - - - - - -  //
    console.log('checking user');
    $http.get('/user').then(function(response) {
        if (response.data.username) {
            $scope.userName = response.data.username;
            console.log('User Data: ', $scope.userName);
            $scope.loggedIn = true;
        } else {
            $location.path("/search");
        }
    });

    $scope.logout = function() {
        $http.get('/user/logout').then(function(response) {
            console.log('logged out');
            $location.path("/home");
        });
    };

    $scope.user = {
      username: '',
      password: ''
    };
    $scope.message = '';

    $scope.login = function() {
      if($scope.user.username == '' || $scope.user.password == '') {
        $scope.message = "Enter your username and password!";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/', $scope.user).then(function(response) {
          if(response.data.username) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            $location.path('/home');
            $('#loginModal').modal('hide');
            $scope.loggedIn = true;

          } else {
            console.log('failure: ', response);
            $scope.message = "Wrong!!";
          }
        });
      }
    }

    $scope.registerUser = function() {
      if($scope.user.username == '' || $scope.user.password == '') {
        $scope.message = "Choose a username and password!";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/register', $scope.user).then(function(response) {
          console.log('success');
          $location.path('/search');
          $scope.success = true;
          $scope.close = true;
          $('#registerModal').modal('hide');

        },
        function(response) {
          console.log('error');
          $scope.message = "Please try again."
        });
      }
    }

}]);
