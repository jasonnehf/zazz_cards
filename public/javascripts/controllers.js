'use strict';

var app = angular.module('zazzCardApp');

app.controller('cardCtrl', function ($scope, CardFactory) {

	if (!$scope.newCard) $scope.newCard = {}

		CardFactory.fetch().then(function (res) {
		$scope.cards = res.data;
	}, function(err) {
		console.log('err: ',err);
	});


	$scope.addCard = function(newCard) {
		console.log('newCard: ', newCard);
		CardFactory.create(angular.copy(newCard)).then(function(res) {
			$('#new-card-modal').modal('hide');
			var newCardCopy = angular.copy(newCard);
			newCardCopy.CardID = res.data.insertId;
			$scope.cards.push(newCardCopy);
			$scope.newCard = undefined;
		}, function(err) {
			console.error('err: ', err);
		});
	};


	$scope.editCard = function(card) {
		$scope.cardEd = angular.copy(card);
	}

	$scope.cancelEditing = function() {
		$scope.cardEd=undefined;
		$scope.newCard=undefined;
	}

	$scope.commitEdit = function(card) {
		card.CardID = $scope.cardEd.CardID;
		console.log("card: ",card)
		CardFactory.update(card).then(function() {
			$scope.cards.splice($scope.cards.findIndex(e => e.CardID === card.CardID), 1, angular.copy(card));
			$scope.card = undefined;
			$('#edit-card-modal').modal('hide');
		});
	}


	$scope.removeCard = function(card) {
		CardFactory.remove(card)
		.then(function(card) {
			CardFactory.fetch().then(function(res) {
				$scope.cards = res.data;
			}, function(err) {
				console.error('err: ', err);
			});

		}, function(err) {
			console.error(err)
		});
	}
})

