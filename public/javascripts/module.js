'use strict';

var app = angular.module('zazzCardApp', ['ui.router', 'ngAnimate','ui.bootstrap']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {url:'/', templateUrl :'/html/home.html'})
		.state('list', {url:'/list', templateUrl :'/html/cardlist.html', controller:"cardCtrl"})
		.state('game', {url:'/game', templateUrl :'/html/game.html', controller:"gameCtrl"})
    $urlRouterProvider.otherwise('/');
});