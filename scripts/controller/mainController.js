'use strict';

spotSearchApp.controller('mainController', ['$scope', 'Spotify', '$http', function($scope, Spotify, $http) {

    $scope.sortType = 'name';
    $scope.sortReverse = false;
    $scope.userName = '  User    ';

    if(sessionStorage.getItem('access-token') != null){
        $scope.searchForm = true;
    }
    $scope.loadingSlider = false;
    
    $scope.login = function () {

        $scope.loadingSlider = true;

        Spotify.login().then(function (data) {

            localStorage.removeItem('spotify-token');
            sessionStorage.setItem('access-token', data);

            $http.get('https://api.spotify.com/v1/me', {

                headers:{'Authorization':'Bearer ' + data}})

                .then(function (response) {

                    $scope.loadingSlider = false;
                    $scope.userName = response.data.id;
                    $scope.searchForm = true;
                    // console.log(data);

                }, function (response) {
                    console.log(response)
                })
    
        }, function () {
            console.log('didn\'t log in');
        });
    };

    let queryButton = document.getElementById('queryButton');
    queryButton.disabled = true;

    $scope.$watch('searchQuery', function () {

        let valid = /^([a-zA-Z0-9])*$/.test($scope.searchQuery);

        if(!($scope.searchQuery == undefined || $scope.searchQuery == null)){
            queryButton.disabled = false;
        } else {
            queryButton.disabled = true;
        }

        if(!valid){
            queryButton.disabled = true;
            $scope.searchQuery = $scope.searchQuery.slice(0, -1);
        }

    }, true);

    $scope.query = () => {

        let access_token = sessionStorage.getItem('access-token');

        $scope.loadingSlider = true;

        $http.get('https://api.spotify.com/v1/search?q='+$scope.searchQuery+'&type=track&limit=5', {
            headers:{'Authorization':'Bearer ' + access_token}})

        .then(function (response) {
            
            $scope.queryResult = response.data.tracks.items;
            $scope.loadingSlider = false;

        }, function (error) {
            console.log(error);
        })

    }

    $scope.signOut = function () {
        sessionStorage.removeItem('access-token');
        $scope.searchForm = false;
        $scope.userName = 'User';
    }
}]);
    