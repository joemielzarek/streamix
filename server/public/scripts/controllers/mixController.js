myApp.controller('MixController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

    $scope.show = '';
    $scope.showInput = '';

    $scope.movie = [];
    var currentContent = {};


    //- - - - - - - Search Guide Box API Functionality - - - - - - -  //
    var randomIndex = randomNumber(0, 9);

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (1 + max - min) + min);
    }

    $scope.mixShow = function() {
        var showsPage = randomNumber(1, 535);
        console.log(showsPage);


        $http.get('http://api-public.guidebox.com/v1.43/US/rK4sScT4OGdI8lVl' +
        'wAkOzOI5DWLeHqUp/shows/all/' + showsPage + '/10/free/all')
            .then(function(response) {
                $scope.show = response.data.results[randomIndex];
                console.log($scope.show);
            });
    }

    $scope.mixMovie = function() {
        var moviesPage = randomNumber(1, 869);
        console.log(moviesPage);


        $http.get('http://api-public.guidebox.com/v1.43/US/rK4sScT4OGdI8lVl' +
        'wAkOzOI5DWLeHqUp/movie/all/' + moviesPage + '/10/free/all')
            .then(function(response) {
                $scope.movie = response.data.results[randomIndex];
                console.log($scope.movie);

            });
    }


    //- - - - - - - Must Watch Favorite Functionality - - - - - - -  //
    $scope.addFavoriteShow = function() {
        currentContent.title = $scope.show.title;
        currentContent.image = $scope.show.artwork_208x117;
        currentContent.watchLink = $scope.show.tvrage.link;
        currentContent.learnLink = $scope.show.wikipedia_id;
        currentContent.user = $scope.userName;

        console.log(currentContent);

        $http.post('/favorites', currentContent)
            .then(function() {
                console.log('POST /favorites');
            });
    };

    // $scope.addFavoriteMovie = function() {
    //     currentContent.title = $scope.movie.title;
    //     currentContent.rating = $scope.movie.rating;
    //     currentContent.releaseYear = $scope.movie.release_year;
    //     currentContent.image = $scope.movie.poster_120x171;
    //     currentContent.image = $scope.show.artwork_208x117;
    //     currentContent.watchLink = $scope.show.tvrage.link;
    //     currentContent.learnLink = $scope.show.wikipedia_id;
    //
    //     console.log(currentContent);
    //
    //     $http.post('/favorites', currentContent)
    //         .then(function() {
    //             console.log('POST /favorites');
    //         });
    // };


    //- - - - - - - User Authentication Functionality - - - - - - -  //
    console.log('checking user...');
    $http.get('/user').then(function(response) {
        if(response.data.username) {
            $scope.userName = response.data.username;
            console.log('User is logged in as ', $scope.userName);
            $scope.loggedIn = true;
        } else {
            $location.path("/mix");
        }
    });

    $scope.logout = function() {
      $http.get('/user/logout').then(function(response) {
        console.log('logged out');
        $location.path("/mix");
      });
    }

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
            $location.path('/mix');
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
          $location.path('/mix');
        },
        function(response) {
          console.log('error');
          $scope.message = "Please try again."
        });
      }
    }
}]);
