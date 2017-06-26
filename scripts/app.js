'use strict';
//basic App definetion
const spotSearchApp = angular.module('spotSearchApp', ['ngRoute', 'ngStorage', 'spotify']);

//setting Up the spotify app
spotSearchApp.config( function (SpotifyProvider) {
    SpotifyProvider.setClientId('3be4a35d03fb483aab6b99b964ee4731');
    SpotifyProvider.setRedirectUri('http://localhost:8080/front_End/callback.html');
    SpotifyProvider.setScope('playlist-read-private');
})