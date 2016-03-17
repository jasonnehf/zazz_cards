'use strict';

var app = angular.module('zazzCardApp');

app.factory('CardFactory', function ($http) {
	return {
		fetch: 	function() {
			return $http.get('/cards');
		},
		create:	function(newCard) {
			return $http.post('/cards',newCard);
		},
		remove:	function(oldCard) {
			var url = `/cards/${oldCard.CardID}`;
			return $http.delete(url);		//	promise
		},
		update:	function(cardEd) {
			return $http.put(`/cards/${cardEd.CardID}`,cardEd);
		}
	}
});