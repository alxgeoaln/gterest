var app = angular.module('app', ['ngRoute', 'ngCookies', 'wu.masonry','ngAnimate', 'ngMaterial']);
app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});