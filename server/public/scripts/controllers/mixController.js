myApp.controller('MixController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

    $scope.show = '';
    $scope.showInput = '';

    $scope.movie = [];
    $scope.moreShow = [];

    var currentContent = {};


    //- - - - - - - Search Guide Box API Functionality - - - - - - -  //
    var randomIndex = randomNumber(0, 9);

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (1 + max - min) + min);
    }

    $scope.mixShow = function() {
        var showsPage = randomNumber(1, 535);
        console.log(showsPage);
        $scope.moreInfo = false;


        $http.get('https://api-public.guidebox.com/v1.43/US/rK4sScT4OGdI8lVl' +
                'wAkOzOI5DWLeHqUp/shows/all/' + showsPage + '/10/free/all')
            .then(function(response) {

                $scope.show = response.data.results[randomIndex];
                console.log($scope.show);
                console.log($scope.show.id);

                $scope.loading = false;

                $scope.moreShowInfo = function() {
                    $http.get('https://api-public.guidebox.com/v1.43/US/rK4sScT4OGdI8lVl' +
                            'wAkOzOI5DWLeHqUp/show/' + $scope.show.id)
                        .then(function(response) {
                            $scope.moreShow = response.data;
                            console.log($scope.moreShow);
                            $scope.moreInfo = true;
                        });

                }

            });
        $scope.loading = true;
    }



    $scope.mixMovie = function() {
        var moviesPage = randomNumber(1, 869);
        console.log(moviesPage);
        $scope.moreInfo = false;

        $http.get('https://api-public.guidebox.com/v1.43/US/rK4sScT4OGdI8lVl' +
                'wAkOzOI5DWLeHqUp/movie/all/' + moviesPage + '/10/free/all')
            .then(function(response) {
                $scope.movie = response.data.results[randomIndex];
                console.log($scope.movie);
                $scope.loading = false;

                $scope.moreShowInfo = function() {
                    $http.get('https://api-public.guidebox.com/v1.43/US/rK4sScT4OGdI8lVl' +
                            'wAkOzOI5DWLeHqUp/movie/' + $scope.movie.id)
                        .then(function(response) {
                            $scope.moreMovie = response.data;
                            console.log($scope.moreMovie);
                            $scope.moreMovie.duration = $scope.moreMovie.duration / 60;
                            $scope.moreInfo = true;
                            $scope.loading = false;

                        });

                }

            });
        $scope.loading = true;

    }


    //- - - - - - - Must Watch Favorite Functionality - - - - - - -  //
    $scope.addFavoriteShow = function() {
        currentContent.contentID = $scope.show.id;
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

    $scope.addFavoriteMovie = function() {
        var watchID = 'http://www.guidebox.com/choose_source_movie.php?movie_id=';
        var tomatoesID = 'http://www.rottentomatoes.com/m/';
        currentContent.title = $scope.movie.original_title;
        currentContent.rating = $scope.movie.rating;
        currentContent.releaseYear = $scope.movie.release_year;
        currentContent.image = $scope.movie.poster_120x171;
        currentContent.watchLink = watchID + $scope.movie.id;
        currentContent.learnLink = $scope.movie.wikipedia_id;
        currentContent.tomates = tomatoesID + $scope.movie.rottentomatoes;
        currentContent.user = $scope.userName;

        console.log(currentContent);

        $http.post('/favorites', currentContent)
            .then(function() {
                console.log('POST /favorites');
            });
    };


    //- - - - - - - User Authentication Functionality - - - - - - -  //
    console.log('checking user...');
    $http.get('/user').then(function(response) {
        if (response.data.username) {
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
            $location.path("/home");
        });
    }

    $scope.user = {
        username: '',
        password: ''
    };
    $scope.message = '';

    $scope.login = function() {
        if ($scope.user.username == '' || $scope.user.password == '') {
            $scope.message = "Enter your username and password!";
        } else {
            console.log('sending to server...', $scope.user);
            $http.post('/', $scope.user).then(function(response) {
                if (response.data.username) {
                    console.log('success: ', response.data);
                    // location works with SPA (ng-route)
                    $location.path('/home');
                    $scope.loggedIn = true;

                } else {
                    console.log('failure: ', response);
                    $scope.message = "Wrong!!";
                }
            });
        }
    }

    $scope.registerUser = function() {
        if ($scope.user.username == '' || $scope.user.password == '') {
            $scope.message = "Choose a username and password!";
        } else {
            console.log('sending to server...', $scope.user);
            $http.post('/register', $scope.user).then(function(response) {
                    console.log('success');
                    $location.path('/mix');
                    $scope.success = true;
                },
                function(response) {
                    console.log('error');
                    $scope.message = "Please try again."
                });
        }
    }

    $(document).ready(function() {

        var i, word, rnd, words, fadeSpeed, timer;

        words = [' ' + 'GREY' + ' ',' ' + 'NORMAL' + ' ',' ' + 'MUNDANE' + ' ', ' ' + 'HUMDRUM' + ' ', '  ' + 'LOWLY' + '  ', ' ' + 'ROUTINE' + ' ', ' ' + 'PROSAIC' + ' ', '  ' + 'BLAH' + '   ', '  ' + 'BORING' + '  ','  ' +  'TRITE' + '  ', '  ' + 'BANAL' + '  ', '  ' + 'DULL' + '  ', '  ' + 'DRAB' + '  ', '  ' + 'STALE' + '  ', ' ' + 'BANAUSIC' + ' ', ' ' + 'INSIPID' + ' ', '  ' + 'BEIGE' + '  ', ' ' + 'ORDINARY' + ' '];

        fadeSpeed = 100;
        timer = 1000;

        for (i = 0; i < words.length; i++) {

            rnd = Math.floor(Math.random() * words.length);
            word = words[rnd];
            words.splice(rnd, 1);


            (function(word) {
                $('.random-word').show(fadeSpeed, function() {
                        $(this).html(word);
                    })
                    // .slideDown('fast')
                    .delay(timer)
                    // .fadeIn(fadeSpeed);
            })(word);
        }


    });

}]);
